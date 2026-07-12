import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GraduationCap, Wallet } from "lucide-react";
import { Tutor } from "../types";
import { getTutorByIdRequest, bookTutorRequest } from "../api/tutors";
import { useAuth } from "../context/AuthContext";
import Badge from "../components/ui/Badge";

const TutorDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ subject: "", date: "", timeSlot: "" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    getTutorByIdRequest(id)
      .then((t) => {
        setTutor(t);
        setForm((f) => ({ ...f, subject: t.tutorSubjects[0] || "" }));
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSubmitting(true);
    setMessage("");
    try {
      await bookTutorRequest(id, form);
      setMessage("Session requested! The tutor will confirm your booking soon.");
      setForm((f) => ({ ...f, date: "", timeSlot: "" }));
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Couldn't book this session.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container-page py-24 text-center text-slate-400">Loading tutor...</div>;
  if (!tutor) return <div className="container-page py-24 text-center text-slate-400">Tutor not found.</div>;

  return (
    <div className="container-page py-12">
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4">
            <img src={tutor.avatarUrl} className="w-20 h-20 rounded-full object-cover" alt={tutor.name} />
            <div>
              <h1 className="text-2xl font-display font-semibold text-slate-800">{tutor.name}</h1>
              <p className="text-sm text-slate-500">{tutor.university}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {tutor.tutorSubjects.map((s) => <Badge key={s} tone="indigo">{s}</Badge>)}
              </div>
            </div>
          </div>

          <section className="mt-8">
            <h2 className="text-lg font-display font-semibold text-slate-800 mb-2">About</h2>
            <p className="text-slate-600 leading-relaxed">{tutor.bio || "This tutor hasn't added a bio yet."}</p>
          </section>

          <section className="mt-8 grid grid-cols-2 gap-4 max-w-sm">
            <div className="index-card p-4">
              <Wallet size={16} className="text-indigo-500 mb-2" />
              <p className="text-xs text-slate-500">Hourly Rate</p>
              <p className="text-sm font-medium text-slate-800">৳{tutor.hourlyRate}/hr</p>
            </div>
            <div className="index-card p-4">
              <GraduationCap size={16} className="text-indigo-500 mb-2" />
              <p className="text-xs text-slate-500">Subjects</p>
              <p className="text-sm font-medium text-slate-800">{tutor.tutorSubjects.length}</p>
            </div>
          </section>
        </div>

        <aside>
          <div className="index-card p-5 sticky top-24">
            <p className="text-sm font-semibold text-slate-800 mb-4">Book a Session</p>

            {!user ? (
              <p className="text-sm text-slate-500">
                <a href="/login" className="text-indigo-600 font-medium">Log in</a> to book a session with {tutor.name}.
              </p>
            ) : (
              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-600">Subject</label>
                  <select
                    required
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-400"
                  >
                    {tutor.tutorSubjects.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">Date</label>
                  <input
                    required
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">Time Slot</label>
                  <input
                    required
                    placeholder="e.g. 6:00 PM - 7:00 PM"
                    value={form.timeSlot}
                    onChange={(e) => setForm((f) => ({ ...f, timeSlot: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-400"
                  />
                </div>
                {message && <p className="text-xs text-indigo-600">{message}</p>}
                <button
                  disabled={submitting}
                  className="w-full py-2.5 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 disabled:opacity-60"
                >
                  {submitting ? "Booking..." : "Request Session"}
                </button>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TutorDetails;
