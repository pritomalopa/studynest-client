import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Users, Calendar, Check } from "lucide-react";
import { StudyGroup } from "../types";
import { getStudyGroupByIdRequest, joinStudyGroupRequest, leaveStudyGroupRequest } from "../api/studyGroups";
import { useAuth } from "../context/AuthContext";

const StudyGroupDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [group, setGroup] = useState<StudyGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const load = () => {
    if (!id) return;
    setLoading(true);
    getStudyGroupByIdRequest(id).then(setGroup).finally(() => setLoading(false));
  };

  useEffect(load, [id]);

  const members = (group?.members || []) as { _id: string; name: string; avatarUrl?: string }[];
  const isMember = !!user && members.some((m) => m._id === user._id);

  const handleJoinLeave = async () => {
    if (!id) return;
    setActionLoading(true);
    try {
      if (isMember) await leaveStudyGroupRequest(id);
      else await joinStudyGroupRequest(id);
      load();
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="container-page py-24 text-center text-slate-400">Loading group...</div>;
  if (!group) return <div className="container-page py-24 text-center text-slate-400">Study group not found.</div>;

  const creator = typeof group.creator === "object" ? group.creator : null;

  return (
    <div className="container-page py-12 max-w-4xl">
      <img src={group.coverImageUrl} className="w-full h-64 object-cover rounded-2xl" alt={group.name} />

      <div className="flex flex-wrap items-start justify-between gap-4 mt-6">
        <div>
          <span className="text-xs font-medium text-indigo-500">{group.subject}</span>
          <h1 className="text-3xl font-display font-semibold text-slate-800 mt-1">{group.name}</h1>
          <p className="text-sm text-slate-500 mt-2 flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Users size={14} /> {members.length} members</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {group.meetingSchedule}</span>
          </p>
        </div>

        {user ? (
          <button
            onClick={handleJoinLeave}
            disabled={actionLoading}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors disabled:opacity-60 ${
              isMember ? "border border-slate-200 text-slate-600" : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          >
            {actionLoading ? "..." : isMember ? "Leave Group" : "Join Group"}
          </button>
        ) : (
          <a href="/login" className="px-6 py-2.5 rounded-full bg-indigo-500 text-white text-sm font-medium">Log in to join</a>
        )}
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-display font-semibold text-slate-800 mb-2">About this group</h2>
        <p className="text-slate-600 leading-relaxed">{group.description}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-display font-semibold text-slate-800 mb-2">Created by</h2>
        <div className="index-card p-4 flex items-center gap-3 max-w-xs">
          <img src={creator?.avatarUrl} className="w-10 h-10 rounded-full object-cover" alt={creator?.name} />
          <div>
            <p className="text-sm font-medium text-slate-800">{creator?.name}</p>
            <p className="text-xs text-slate-500">{creator?.university}</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-display font-semibold text-slate-800 mb-3">Members ({members.length})</h2>
        <div className="flex flex-wrap gap-3">
          {members.map((m) => (
            <div key={m._id} className="flex items-center gap-2 index-card px-3 py-2">
              <img src={m.avatarUrl} className="w-7 h-7 rounded-full object-cover" alt={m.name} />
              <span className="text-sm text-slate-700">{m.name}</span>
              {isMember && m._id === user?._id && <Check size={14} className="text-emerald-500" />}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudyGroupDetails;
