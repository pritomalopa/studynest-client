import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Tutor } from "../types";
import { getTutorsRequest } from "../api/tutors";
import { SUBJECTS } from "../constants";
import EmptyState from "../components/ui/EmptyState";

const Tutors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  const subject = searchParams.get("subject") || "";
  const maxRate = searchParams.get("maxRate") || "";

  useEffect(() => {
    setLoading(true);
    getTutorsRequest({ subject, maxRate: maxRate ? Number(maxRate) : undefined })
      .then(setTutors)
      .finally(() => setLoading(false));
  }, [subject, maxRate]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  return (
    <div className="container-page py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold text-slate-800">Find a Tutor</h1>
        <p className="text-slate-500 mt-1">Book verified student tutors for one-on-one sessions.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={subject}
          onChange={(e) => updateParam("subject", e.target.value)}
          className="text-sm border border-slate-200 rounded-full px-4 py-2 focus:outline-none focus:border-indigo-400"
        >
          <option value="">All subjects</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={maxRate}
          onChange={(e) => updateParam("maxRate", e.target.value)}
          className="text-sm border border-slate-200 rounded-full px-4 py-2 focus:outline-none focus:border-indigo-400"
        >
          <option value="">Any rate</option>
          <option value="300">Up to ৳300/hr</option>
          <option value="500">Up to ৳500/hr</option>
          <option value="800">Up to ৳800/hr</option>
        </select>
      </div>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading tutors...</p>
      ) : tutors.length === 0 ? (
        <EmptyState
          icon={<GraduationCap size={26} />}
          title="No tutors match your filters"
          description="Try a different subject or rate range."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((t) => (
            <Link key={t._id} to={`/tutors/${t._id}`} className="index-card p-5 text-center">
              <img src={t.avatarUrl} className="w-16 h-16 rounded-full object-cover mx-auto mb-3" alt={t.name} />
              <h3 className="font-display font-semibold text-slate-800">{t.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{t.university}</p>
              <p className="text-xs text-indigo-500 font-medium mt-2">{t.tutorSubjects.join(", ")}</p>
              <p className="text-sm font-semibold text-slate-800 mt-2">৳{t.hourlyRate}/hr</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tutors;
