import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarClock, PlusCircle, Library } from "lucide-react";
import { Booking } from "../types";
import { getMyBookingsRequest } from "../api/tutors";
import { useAuth } from "../context/AuthContext";
import Badge from "../components/ui/Badge";

const statusTone: Record<string, "indigo" | "amber" | "emerald" | "slate"> = {
  pending: "amber",
  confirmed: "indigo",
  completed: "emerald",
  cancelled: "slate",
};

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<{ asStudent: Booking[]; asTutor: Booking[] }>({
    asStudent: [],
    asTutor: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyBookingsRequest().then(setBookings).finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-display font-semibold text-slate-800">
        Welcome back, {user?.name.split(" ")[0]}
      </h1>
      <p className="text-slate-500 mt-1 mb-8">Here's what's happening with your StudyNest account.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <Link to="/resources/add" className="index-card p-5 flex items-center gap-3 hover:border-indigo-300">
          <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center"><PlusCircle size={18} /></span>
          <span className="text-sm font-medium text-slate-700">Add a Resource</span>
        </Link>
        <Link to="/resources/manage" className="index-card p-5 flex items-center gap-3 hover:border-indigo-300">
          <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center"><Library size={18} /></span>
          <span className="text-sm font-medium text-slate-700">Manage Resources</span>
        </Link>
        <Link to="/tutors" className="index-card p-5 flex items-center gap-3 hover:border-indigo-300">
          <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center"><CalendarClock size={18} /></span>
          <span className="text-sm font-medium text-slate-700">Book a Tutor</span>
        </Link>
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-display font-semibold text-slate-800 mb-4">Your Bookings (as Student)</h2>
        {loading ? (
          <p className="text-sm text-slate-400">Loading...</p>
        ) : bookings.asStudent.length === 0 ? (
          <p className="text-sm text-slate-500">No sessions booked yet. <Link to="/tutors" className="text-indigo-600 font-medium">Find a tutor</Link></p>
        ) : (
          <div className="space-y-3">
            {bookings.asStudent.map((b) => (
              <div key={b._id} className="index-card p-4 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-sm font-medium text-slate-800">{b.subject}</p>
                  <p className="text-xs text-slate-500">{b.date} • {b.timeSlot} • with {typeof b.tutor === "object" ? b.tutor.name : "Tutor"}</p>
                </div>
                <Badge tone={statusTone[b.status]}>{b.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </section>

      {user?.isTutor && (
        <section>
          <h2 className="text-lg font-display font-semibold text-slate-800 mb-4">Sessions Booked With You (as Tutor)</h2>
          {bookings.asTutor.length === 0 ? (
            <p className="text-sm text-slate-500">No students have booked a session with you yet.</p>
          ) : (
            <div className="space-y-3">
              {bookings.asTutor.map((b) => (
                <div key={b._id} className="index-card p-4 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{b.subject}</p>
                    <p className="text-xs text-slate-500">{b.date} • {b.timeSlot} • with {typeof b.student === "object" ? b.student.name : "Student"}</p>
                  </div>
                  <Badge tone={statusTone[b.status]}>{b.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Dashboard;
