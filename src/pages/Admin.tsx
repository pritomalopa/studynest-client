import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { Users, Library, UsersRound, CalendarClock, GraduationCap } from "lucide-react";
import { AdminStats, getAdminStatsRequest, getAdminUsersRequest, getAdminResourcesRequest } from "../api/admin";
import { User, Resource } from "../types";

const COLORS = ["#4F46E5", "#F59E0B", "#10B981", "#94A3B8", "#818CF8", "#FBBF24"];

const Admin = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [tab, setTab] = useState<"overview" | "users" | "resources">("overview");

  useEffect(() => {
    getAdminStatsRequest().then(setStats);
    getAdminUsersRequest().then(setUsers);
    getAdminResourcesRequest().then(setResources);
  }, []);

  const cards = stats
    ? [
        { label: "Total Users", value: stats.totals.totalUsers, icon: <Users size={18} />, tone: "bg-indigo-50 text-indigo-500" },
        { label: "Tutors", value: stats.totals.totalTutors, icon: <GraduationCap size={18} />, tone: "bg-amber-50 text-amber-500" },
        { label: "Resources", value: stats.totals.totalResources, icon: <Library size={18} />, tone: "bg-emerald-50 text-emerald-500" },
        { label: "Study Groups", value: stats.totals.totalGroups, icon: <UsersRound size={18} />, tone: "bg-indigo-50 text-indigo-500" },
        { label: "Bookings", value: stats.totals.totalBookings, icon: <CalendarClock size={18} />, tone: "bg-amber-50 text-amber-500" },
      ]
    : [];

  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-display font-semibold text-slate-800">Admin Dashboard</h1>
      <p className="text-slate-500 mt-1 mb-8">Platform overview and moderation tools.</p>

      <div className="flex gap-2 mb-8">
        {(["overview", "users", "resources"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-indigo-500 text-white" : "border border-slate-200 text-slate-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && stats && (
        <>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {cards.map((c) => (
              <div key={c.label} className="index-card p-5">
                <span className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${c.tone}`}>{c.icon}</span>
                <p className="text-2xl font-display font-semibold text-slate-800">{c.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{c.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="index-card p-5">
              <p className="text-sm font-semibold text-slate-800 mb-4">Resources by Subject</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={stats.bySubject}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="subject" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="index-card p-5">
              <p className="text-sm font-semibold text-slate-800 mb-4">Subject Distribution</p>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={stats.bySubject} dataKey="count" nameKey="subject" outerRadius={90} label={{ fontSize: 11 }}>
                    {stats.bySubject.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {tab === "users" && (
        <div className="index-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs text-slate-500 uppercase">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">University</th>
                <th className="px-5 py-3">Tutor</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-slate-50 last:border-0">
                  <td className="px-5 py-3 font-medium text-slate-800">{u.name}</td>
                  <td className="px-5 py-3 text-slate-600">{u.email}</td>
                  <td className="px-5 py-3 text-slate-600 capitalize">{u.role}</td>
                  <td className="px-5 py-3 text-slate-600">{u.university || "—"}</td>
                  <td className="px-5 py-3 text-slate-600">{u.isTutor ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "resources" && (
        <div className="index-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs text-slate-500 uppercase">
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Subject</th>
                <th className="px-5 py-3">Uploader</th>
                <th className="px-5 py-3">Rating</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((r) => (
                <tr key={r._id} className="border-b border-slate-50 last:border-0">
                  <td className="px-5 py-3 font-medium text-slate-800 max-w-xs truncate">{r.title}</td>
                  <td className="px-5 py-3 text-slate-600">{r.subject}</td>
                  <td className="px-5 py-3 text-slate-600">
                    {typeof r.uploader === "object" ? r.uploader.name : "—"}
                  </td>
                  <td className="px-5 py-3 text-slate-600">{r.avgRating.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
