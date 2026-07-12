import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import { StudyGroup } from "../../types";
import { getStudyGroupsRequest } from "../../api/studyGroups";

const StudyGroupsSpotlight = () => {
  const [groups, setGroups] = useState<StudyGroup[]>([]);

  useEffect(() => {
    getStudyGroupsRequest().then((data) => setGroups(data.slice(0, 3))).catch(() => setGroups([]));
  }, []);

  if (groups.length === 0) return null;

  return (
    <section className="bg-indigo-50/50 py-20">
      <div className="container-page">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-indigo-500">Community</span>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-slate-800 mt-1">
              Active Study Groups
            </h2>
          </div>
          <Link to="/study-groups" className="hidden sm:flex items-center gap-1 text-sm font-medium text-indigo-600 hover:gap-2 transition-all">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {groups.map((g) => (
            <Link key={g._id} to={`/study-groups/${g._id}`} className="index-card overflow-hidden">
              <img src={g.coverImageUrl} alt={g.name} className="h-32 w-full object-cover" />
              <div className="p-4">
                <span className="text-xs font-medium text-indigo-500">{g.subject}</span>
                <h3 className="font-display font-semibold text-slate-800 mt-1">{g.name}</h3>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                  <Users size={12} /> {Array.isArray(g.members) ? g.members.length : 0} members
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyGroupsSpotlight;
