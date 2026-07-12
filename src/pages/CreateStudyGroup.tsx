import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudyGroupRequest } from "../api/studyGroups";
import { SUBJECTS } from "../constants";

const CreateStudyGroup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    subject: SUBJECTS[0],
    description: "",
    coverImageUrl: "",
    meetingSchedule: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const group = await createStudyGroupRequest(form);
      navigate(`/study-groups/${group._id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Couldn't create the group.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-page py-12 max-w-2xl">
      <h1 className="text-3xl font-display font-semibold text-slate-800">Create a Study Group</h1>
      <p className="text-slate-500 mt-1 mb-8">Find classmates who want to learn the same thing, together.</p>

      <form onSubmit={handleSubmit} className="index-card p-6 space-y-5">
        {error && <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

        <div>
          <label className="text-sm font-medium text-slate-700">Group Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. DSA Grinders — DU CSE"
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Subject</label>
          <select
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          >
            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Description</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="What will this group focus on?"
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Meeting Schedule</label>
          <input
            required
            value={form.meetingSchedule}
            onChange={(e) => update("meetingSchedule", e.target.value)}
            placeholder="e.g. Every Saturday, 8:00 PM (online, Google Meet)"
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Cover Image URL (optional)</label>
          <input
            value={form.coverImageUrl}
            onChange={(e) => update("coverImageUrl", e.target.value)}
            placeholder="https://..."
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <button
          disabled={submitting}
          className="w-full py-3 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 disabled:opacity-60 transition-colors"
        >
          {submitting ? "Creating..." : "Create Group"}
        </button>
      </form>
    </div>
  );
};

export default CreateStudyGroup;
