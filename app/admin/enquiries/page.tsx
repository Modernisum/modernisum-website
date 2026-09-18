"use client";

import React, { useState, useEffect } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  Inbox,
  Search,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Filter,
  ExternalLink,
  Loader2,
  Database,
} from "lucide-react";

interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  budgetRange: string;
  projectDescription: string;
  status: "new" | "in_progress" | "resolved";
  createdAt: string;
}

const MOCK_ENQUIRIES: EnquiryItem[] = [
  {
    id: "enq-01",
    name: "Dr. K. S. Verma",
    email: "principal@delhipublicbranch.edu",
    phone: "+91 9897123456",
    serviceNeeded: "Modern School ERP Ecosystem",
    budgetRange: "₹2,00,000 - ₹5,00,000",
    projectDescription: "We operate 3 campuses with 4,200 students and 35 buses. Need RFID turnstiles and parent GPS bus tracking before the new academic session.",
    status: "new",
    createdAt: "2026-03-16",
  },
];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(MOCK_ENQUIRIES);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/enquiry");
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const mapped = json.data.map((item: any) => ({
          id: item._id || item.id,
          name: item.name,
          email: item.email,
          phone: item.phone || "Not specified",
          serviceNeeded: item.serviceNeeded || "Custom Solution",
          budgetRange: item.budgetRange || "Flexible",
          projectDescription: item.projectDescription || "",
          status: item.status || "new",
          createdAt: item.createdAt ? item.createdAt.substring(0, 10) : new Date().toISOString().substring(0, 10),
        }));
        setEnquiries(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const filtered = enquiries.filter((item) => {
    const matchesFilter = filter === "all" || item.status === filter;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.serviceNeeded.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateStatus = (id: string, newStatus: EnquiryItem["status"]) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">
            Client Enquiries & Architecture Leads
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time inbound inquiries captured via Quote Calculator & Contact forms.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2">
          {["all", "new", "in_progress", "resolved"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-xs font-mono uppercase transition-all cursor-pointer ${
                filter === status
                  ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-200"
                  : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter by name, email, or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
        />
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filtered.map((enq) => (
          <LiquidGlassCard
            key={enq.id}
            glowColor={
              enq.status === "new"
                ? "rgba(0, 242, 254, 0.15)"
                : "rgba(121, 40, 202, 0.1)"
            }
            className="p-6 rounded-3xl border border-white/10 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-base text-white">{enq.name}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                      enq.status === "new"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                        : enq.status === "in_progress"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-400/40"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <a href={`mailto:${enq.email}`} className="hover:text-cyan-300">
                      {enq.email}
                    </a>
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-purple-400" />
                    <a href={`tel:${enq.phone}`} className="hover:text-cyan-300">
                      {enq.phone}
                    </a>
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {enq.createdAt}
                  </span>
                </div>
              </div>

              {/* Status Switcher & Action */}
              <div className="flex items-center gap-2">
                <select
                  value={enq.status}
                  onChange={(e) =>
                    updateStatus(enq.id, e.target.value as EnquiryItem["status"])
                  }
                  className="bg-black/60 border border-white/20 rounded-xl px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="new">New Lead</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>

                <a
                  href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <span>WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Tags and Details */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md">
                  Scope: {enq.serviceNeeded}
                </span>
                <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">
                  Budget: {enq.budgetRange}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {enq.projectDescription}
              </p>
            </div>
          </LiquidGlassCard>
        ))}
      </div>
    </div>
  );
}
