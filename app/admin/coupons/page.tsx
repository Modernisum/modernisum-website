"use client";

import React, { useEffect, useState } from "react";
import {
  Ticket,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  X,
  RefreshCw,
  Percent,
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    code: "",
    discountPercent: 20,
    validUntil: "2026-12-31",
    maxUses: 50,
    notes: "Special Institutional Promotion",
  });

  const loadCoupons = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/coupons");
      const data = await res.json();
      if (data.success) {
        setCoupons(data.coupons || []);
      }
    } catch (err) {
      console.error("Failed to load coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        setForm({
          code: "",
          discountPercent: 20,
          validUntil: "2026-12-31",
          maxUses: 50,
          notes: "",
        });
        loadCoupons();
      } else {
        alert(data.message || "Failed to create coupon");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating coupon");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Ticket className="w-6 h-6 text-purple-400" />
            Subscription Coupons & Discounts
          </h2>
          <p className="text-sm text-slate-400">
            Promotional codes and partner discount allowances for school onboarding.
          </p>
        </div>
        <GlassButton
          variant="primary"
          onClick={() => setModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Create New Coupon
        </GlassButton>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 p-12 text-center text-slate-500">Loading coupons...</div>
        ) : coupons.length === 0 ? (
          <div className="col-span-3 p-12 text-center text-slate-500">No active coupons.</div>
        ) : (
          coupons.map((c) => (
            <LiquidGlassCard key={c.id || c.code} glowColor="purple" className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-base font-bold text-cyan-300 tracking-wider bg-cyan-500/10 px-2.5 py-1 rounded-xl border border-cyan-500/20">
                    {c.code}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {c.isActive ? "Active" : "Revoked"}
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">{c.discountPercent}%</span>
                  <span className="text-xs text-slate-400 font-medium">DISCOUNT</span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Usage:</span>
                    <span className="text-slate-200">{c.usedCount || 0} / {c.maxUses} Redeemed</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valid Until:</span>
                    <span className="text-slate-300">{new Date(c.validUntil).toLocaleDateString()}</span>
                  </div>
                  {c.notes && (
                    <p className="pt-2 border-t border-white/5 text-[11px] text-slate-400">{c.notes}</p>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                <span className="text-[11px] text-purple-300">Modernisum Partner Program</span>
              </div>
            </LiquidGlassCard>
          ))
        )}
      </div>

      {/* Create Coupon Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel-elevated border border-white/10 rounded-2xl p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-purple-400" />
              Create Promotional Coupon
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Discount voucher for Vidhyam Cloud SaaS subscriptions.
            </p>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Coupon Code</label>
                <GlassInput
                  required
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. WELCOME2026"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Discount (%)</label>
                  <GlassInput
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={form.discountPercent}
                    onChange={(e) => setForm({ ...form, discountPercent: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Max Redemptions</label>
                  <GlassInput
                    type="number"
                    required
                    value={form.maxUses}
                    onChange={(e) => setForm({ ...form, maxUses: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Valid Until Date</label>
                <GlassInput
                  type="date"
                  required
                  value={form.validUntil}
                  onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Internal Campaign Notes</label>
                <GlassInput
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="e.g. Authorized by Board of Directors"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <GlassButton variant="ghost" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </GlassButton>
                <GlassButton variant="primary" type="submit" loading={submitting}>
                  Issue Coupon
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
