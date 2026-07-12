import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Users, PlusCircle, Search, UsersRound } from "lucide-react";
import { StudyGroup } from "../types";
import { getStudyGroupsRequest } from "../api/studyGroups";
import { SUBJECTS } from "../constants";
import { useAuth } from "../context/AuthContext";
import EmptyState from "../components/ui/EmptyState";

const StudyGroups = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const subject = searchParams.get("subject") || "";
  const search = searchParams.get("search") || "";

  useEffect(() => {
    setLoading(true);
    getStudyGroupsRequest({ subject, search })
      .then(setGroups)
      .finally(() => setLoading(false));
  }, [subject, search]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  return (
    <div className="container-page py-12">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-display font-semibold text-slate-800">Study Groups</h1>
          <p className="text-slate-500 mt-1">Find your people and learn together, every week.</p>
        </div>
        {user && (
          <Link to="/study-groups/create" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors">
            <PlusCircle size={16} /> Create Group
          </Link>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            defaultValue={search}
            onBlur={(e) => updateParam("search", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && updateParam("search", (e.target as HTMLInputElement).value)}
            placeholder="Search group name"
            className="pl-9 pr-3 py-2 text-sm rounded-full border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>
        <select
          value={subject}
          onChange={(e) => updateParam("subject", e.target.value)}
          className="text-sm border border-slate-200 rounded-full px-4 py-2 focus:outline-none focus:border-indigo-400"
        >
          <option value="">All subjects</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading study groups...</p>
      ) : groups.length === 0 ? (
        <EmptyState
          icon={<UsersRound size={26} />}
          title="No study groups found"
          description="Be the first to start one for this subject."
          actionLabel={user ? "Create a group" : "Log in to create one"}
          actionTo={user ? "/study-groups/create" : "/login"}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((g) => (
            <Link key={g._id} to={`/study-groups/${g._id}`} className="index-card overflow-hidden">
              <img src={g.coverImageUrl} className="h-36 w-full object-cover" alt={g.name} />
              <div className="p-4">
                <span className="text-xs font-medium text-indigo-500">{g.subject}</span>
                <h3 className="font-display font-semibold text-slate-800 mt-1">{g.name}</h3>
                <p className="text-sm text-slate-500 mt-1.5 line-clamp-2">{g.description}</p>
                <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
                  <Users size={12} /> {Array.isArray(g.members) ? g.members.length : 0} members • {g.meetingSchedule}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyGroups;
