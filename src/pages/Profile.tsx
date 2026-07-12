import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfileRequest } from "../api/auth";
import { SUBJECTS } from "../constants";

const Profile = () => {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    university: user?.university || "",
    bio: user?.bio || "",
    avatarUrl: user?.avatarUrl || "",
    isTutor: user?.isTutor || false,
    tutorSubjects: user?.tutorSubjects || [],
    hourlyRate: user?.hourlyRate || 0,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const toggleSubject = (subject: string) => {
    setForm((f) => ({
      ...f,
      tutorSubjects: f.tutorSubjects.includes(subject)
        ? f.tutorSubjects.filter((s) => s !== subject)
        : [...f.tutorSubjects, subject],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await updateProfileRequest(form as any);
      await refreshUser();
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container-page py-12 max-w-2xl">
      <h1 className="text-3xl font-display font-semibold text-slate-800">Your Profile</h1>
      <p className="text-slate-500 mt-1 mb-8">{user.email}</p>

      <form onSubmit={handleSubmit} className="index-card p-6 space-y-5">
        <div className="flex items-center gap-4">
          <img
            src={form.avatarUrl || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"}
            className="w-16 h-16 rounded-full object-cover"
            alt={form.name}
          />
          <div className="flex-1">
            <label className="text-sm font-medium text-slate-700">Avatar Image URL</label>
            <input
              value={form.avatarUrl}
              onChange={(e) => update("avatarUrl", e.target.value)}
              className="mt-1.5 w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Full Name</label>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">University</label>
          <input
            value={form.university}
            onChange={(e) => update("university", e.target.value)}
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Bio</label>
          <textarea
            rows={3}
            value={form.bio}
            onChange={(e) => update("bio", e.target.value)}
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <input type="checkbox" checked={form.isTutor} onChange={(e) => update("isTutor", e.target.checked)} />
          I offer tutoring sessions
        </label>

        {form.isTutor && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-700">Subjects you teach</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {SUBJECTS.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => toggleSubject(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      form.tutorSubjects.includes(s) ? "bg-indigo-500 text-white border-indigo-500" : "border-slate-200 text-slate-600"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Hourly Rate (৳)</label>
              <input
                type="number"
                min={0}
                value={form.hourlyRate}
                onChange={(e) => update("hourlyRate", Number(e.target.value))}
                className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
              />
            </div>
          </div>
        )}

        {saved && <p className="text-sm text-emerald-600">Profile updated successfully.</p>}

        <button
          disabled={saving}
          className="w-full py-3 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 disabled:opacity-60 transition-colors"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
