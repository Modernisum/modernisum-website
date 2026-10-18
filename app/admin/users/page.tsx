"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  Search,
  RefreshCw,
  UserCheck,
  UserX,
  Shield,
  Building,
  GraduationCap,
  Sprout,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  Layers,
  Filter,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Plus,
  Star,
} from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { PlatformUser } from "@/lib/platform-users-engine";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<PlatformUser[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [productFilter, setProductFilter] = useState<"all" | "active_products" | "zero_products">("all");
  const [selectedUser, setSelectedUser] = useState<PlatformUser | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleToggleHome = async (id: string, currentState: boolean) => {
    try {
      setActionLoading(id);
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          featuredOnHome: !currentState,
        }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, featuredOnHome: !currentState } : u))
        );
        if (selectedUser?.id === id) {
          setSelectedUser((prev) => prev ? { ...prev, featuredOnHome: !currentState } : null);
        }
      }
    } catch (err) {
      console.error("Failed to toggle user on home:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (roleFilter !== "all") params.set("role", roleFilter);
      if (productFilter !== "all") params.set("hasProduct", productFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.users || []);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [roleFilter, productFilter, search]);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-pink-500/15 text-pink-300 border border-pink-500/30">
            <Shield className="w-3 h-3 text-pink-400" /> Super Admin
          </span>
        );
      case "school_admin":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            <Building className="w-3 h-3 text-cyan-400" /> School Owner / Admin
          </span>
        );
      case "teacher":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <GraduationCap className="w-3 h-3 text-purple-400" /> Faculty / Teacher
          </span>
        );
      case "farmer":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <Sprout className="w-3 h-3 text-emerald-400" /> Agro Producer
          </span>
        );
      case "lead":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Clock className="w-3 h-3 text-amber-400" /> Prospect / Lead
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            Platform Users & Enterprise Identity
          </h2>
          <p className="text-sm text-slate-400">
            Unified directory of institutional school owners, faculty members, agro clients, and registered prospect leads.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <GlassButton
            variant="secondary"
            size="sm"
            onClick={loadUsers}
            icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />}
          >
            Refresh Directory
          </GlassButton>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-white/10 bg-[#0c121e]/90 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Total Directory</span>
          <div className="text-2xl font-bold text-white mt-1 font-display">
            {stats?.totalUsers || users.length} Users
          </div>
          <span className="text-[11px] text-cyan-400 mt-1 block font-mono">Central Ecosystem Registry</span>
        </div>

        <div className="p-4 rounded-2xl border border-white/10 bg-[#0c121e]/90 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Active Product Users</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1 font-display">
            {stats?.activeProductUsers || 9} Accounts
          </div>
          <span className="text-[11px] text-emerald-400/80 mt-1 block font-mono">Running Desktop OS / Apps</span>
        </div>

        <div className="p-4 rounded-2xl border border-white/10 bg-[#0c121e]/90 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition-colors">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Zero-Product Leads</span>
          <div className="text-2xl font-bold text-amber-400 mt-1 font-display">
            {stats?.zeroProductUsers || 3} Prospects
          </div>
          <span className="text-[11px] text-amber-400/90 mt-1 block font-mono">Registered Leads / 0 Products</span>
        </div>

        <div className="p-4 rounded-2xl border border-white/10 bg-[#0c121e]/90 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-blue-500/40 transition-colors">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Total Verified Spend</span>
          <div className="text-2xl font-bold text-blue-400 mt-1 font-display">
            ₹{((stats?.totalRevenueSpend || 2082000) / 100000).toFixed(2)}L
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">Institutional B2B Paid</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <GlassInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user name, email, phone, or school / farm name..."
            className="pl-10"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-white/10 bg-[#0c121e] text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Roles</option>
            <option value="school_admin">School Owner / Admin</option>
            <option value="teacher">Faculty / Teacher</option>
            <option value="farmer">Agro Farmer</option>
            <option value="lead">Prospect / Zero-Product Lead</option>
            <option value="super_admin">Super Admin</option>
          </select>

          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value as any)}
            className="px-3 py-2.5 rounded-xl border border-white/10 bg-[#0c121e] text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Product Usages</option>
            <option value="active_products">Active Products Only</option>
            <option value="zero_products">Zero Products (Leads Only)</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c121e]/90 backdrop-blur-xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04] text-slate-400 uppercase tracking-wider text-[11px] font-mono">
                <th className="p-3.5">User ID</th>
                <th className="p-3.5">User Identity</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Organization / School</th>
                <th className="p-3.5">Software Products In Use</th>
                <th className="p-3.5">Spend</th>
                <th className="p-3.5">Acquisition Source</th>
                <th className="p-3.5 text-center">Home Showcase</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500">
                    Loading users directory...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500">
                    No users matching criteria.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-mono text-cyan-400 font-bold">
                      {user.id}
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-500" /> {user.email}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                        <Phone className="w-2.5 h-2.5 text-slate-600" /> {user.phone}
                      </div>
                    </td>
                    <td className="p-3.5">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="p-3.5 text-slate-300">
                      <div className="font-medium text-white">{user.organization || "Independent"}</div>
                      <div className="text-[10px] text-slate-500">Last active: {user.lastActive}</div>
                    </td>
                    <td className="p-3.5">
                      {user.productsActive && user.productsActive.length > 0 ? (
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {user.productsActive.map((prod, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                            >
                              {prod}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-amber-300/90 border border-amber-500/20">
                          Zero Products Active (Free Lead)
                        </span>
                      )}
                    </td>
                    <td className="p-3.5">
                      {user.totalSpend > 0 ? (
                        <div className="font-bold text-emerald-400 font-mono text-sm">
                          ₹{user.totalSpend.toLocaleString("en-IN")}
                        </div>
                      ) : (
                        <div className="text-slate-500 font-mono text-xs">
                          ₹0 (Unbilled)
                        </div>
                      )}
                    </td>
                    <td className="p-3.5">
                      <div className="text-slate-300">{user.source}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{user.joinedDate}</div>
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => handleToggleHome(user.id, Boolean(user.featuredOnHome))}
                        disabled={actionLoading === user.id}
                        title={user.featuredOnHome ? "Featured on Home Page (click to remove)" : "Click to showcase this customer on Home Page"}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                          user.featuredOnHome
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40"
                            : "bg-white/[0.04] text-slate-400 border border-white/10 hover:text-white hover:border-cyan-500/40"
                        }`}
                      >
                        {actionLoading === user.id ? (
                          "..."
                        ) : user.featuredOnHome ? (
                          <>
                            <Sparkles className="w-3 h-3 text-purple-400" />
                            <span>On Home</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>Feature</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-colors"
                      >
                        Profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel-elevated border border-white/15 rounded-2xl p-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-cyan-400">{selectedUser.id}</span>
              {getRoleBadge(selectedUser.role)}
            </div>
            <h3 className="text-lg font-bold text-white mb-0.5">{selectedUser.name}</h3>
            <p className="text-xs text-slate-400 mb-4">{selectedUser.organization || "Individual User"}</p>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2.5 mb-4 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Email Address:</span>
                <span className="text-white">{selectedUser.email}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Phone:</span>
                <span className="text-white">{selectedUser.phone}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Registration Date:</span>
                <span className="text-white">{selectedUser.joinedDate}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Acquisition Channel:</span>
                <span className="text-cyan-300">{selectedUser.source}</span>
              </div>
              <div className="flex justify-between text-slate-300 pt-2 border-t border-white/5">
                <span>Verified Lifetime Spend:</span>
                <span className="font-bold text-emerald-400 text-sm">
                  {selectedUser.totalSpend > 0 ? `₹${selectedUser.totalSpend.toLocaleString("en-IN")}` : "₹0 (Free / Lead)"}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                Assigned Software Products:
              </h4>
              {selectedUser.productsActive.length > 0 ? (
                <div className="space-y-1.5">
                  {selectedUser.productsActive.map((prod, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{prod}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                  This user has registered on the platform but has not activated any paid products yet. They can be converted via direct outreach.
                </div>
              )}
            </div>

            <div className="mb-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-purple-200 block">Home Page Showcase</span>
                <span className="text-[10px] text-purple-300/80">
                  {selectedUser.featuredOnHome ? "Currently featured on Home page" : "Not featured on Home"}
                </span>
              </div>
              <button
                onClick={() => handleToggleHome(selectedUser.id, Boolean(selectedUser.featuredOnHome))}
                disabled={actionLoading === selectedUser.id}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedUser.featuredOnHome
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30"
                    : "bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30"
                }`}
              >
                {selectedUser.featuredOnHome ? "Remove from Home" : "Feature on Home"}
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <GlassButton variant="secondary" size="sm" onClick={() => setSelectedUser(null)}>
                Close
              </GlassButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
