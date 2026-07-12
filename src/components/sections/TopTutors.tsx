import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Tutor } from "../../types";
import { getTutorsRequest } from "../../api/tutors";

const TopTutors = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);

  useEffect(() => {
    getTutorsRequest().then((data) => setTutors(data.slice(0, 3))).catch(() => setTutors([]));
  }, []);

  if (tutors.length === 0) return null;

  return (
    <section className="container-page py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-indigo-500">Meet the tutors</span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-slate-800 mt-1">
            Top Tutors
          </h2>
        </div>
        <Link to="/tutors" className="hidden sm:flex items-center gap-1 text-sm font-medium text-indigo-600 hover:gap-2 transition-all">
          View all <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {tutors.map((t) => (
          <Link key={t._id} to={`/tutors/${t._id}`} className="index-card p-5 text-center">
            <img
              src={t.avatarUrl || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
              alt={t.name}
              className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
            />
            <h3 className="font-display font-semibold text-slate-800">{t.name}</h3>
            <p className="text-xs text-slate-500 mt-1">{t.university}</p>
            <p className="text-xs text-indigo-500 font-medium mt-2">{t.tutorSubjects.slice(0, 2).join(", ")}</p>
            <p className="text-sm font-semibold text-slate-800 mt-2">৳{t.hourlyRate}/hr</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopTutors;
