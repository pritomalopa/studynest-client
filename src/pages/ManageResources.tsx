import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2, PlusCircle, Library } from "lucide-react";
import { Resource } from "../types";
import { getMyResourcesRequest, deleteResourceRequest } from "../api/resources";
import EmptyState from "../components/ui/EmptyState";
import Badge from "../components/ui/Badge";

const ManageResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    setLoading(true);
    getMyResourcesRequest().then(setResources).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      await deleteResourceRequest(id);
      setResources((prev) => prev.filter((r) => r._id !== id));
    } finally {
      setDeleting(false);
      setConfirmId(null);
    }
  };

  return (
    <div className="container-page py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-semibold text-slate-800">Manage Resources</h1>
          <p className="text-slate-500 mt-1">Everything you've shared on StudyNest.</p>
        </div>
        <Link
          to="/resources/add"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors"
        >
          <PlusCircle size={16} /> Add Resource
        </Link>
      </div>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading your resources...</p>
      ) : resources.length === 0 ? (
        <EmptyState
          icon={<Library size={26} />}
          title="You haven't added any resources yet"
          description="Share your notes, slides, or study materials to help fellow students."
          actionLabel="Add your first resource"
          actionTo="/resources/add"
        />
      ) : (
        <div className="index-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs text-slate-500 uppercase">
                <th className="px-5 py-3">Resource</th>
                <th className="px-5 py-3">Subject</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Rating</th>
                <th className="px-5 py-3">Uploaded</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((r) => (
                <tr key={r._id} className="border-b border-slate-50 last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={r.coverImageUrl} className="w-10 h-10 rounded-lg object-cover" alt={r.title} />
                      <span className="font-medium text-slate-800 line-clamp-1 max-w-[220px]">{r.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{r.subject}</td>
                  <td className="px-5 py-3">
                    <Badge tone={r.priceType === "free" ? "emerald" : "amber"}>
                      {r.priceType === "free" ? "Free" : `৳${r.price}`}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{r.avgRating.toFixed(1)} ({r.reviewCount})</td>
                  <td className="px-5 py-3 text-slate-500">
                    {new Date(r.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/resources/${r._id}`} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
                        <Eye size={16} />
                      </Link>
                      <button
                        onClick={() => setConfirmId(r._id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmId && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-display font-semibold text-slate-800 text-lg">Delete this resource?</h3>
            <p className="text-sm text-slate-500 mt-2">This action can't be undone. All reviews on it will also be removed.</p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 py-2.5 rounded-full border border-slate-200 text-sm font-medium text-slate-600"
              >
                Cancel
              </button>
              <button
                disabled={deleting}
                onClick={() => handleDelete(confirmId)}
                className="flex-1 py-2.5 rounded-full bg-red-500 text-white text-sm font-medium disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageResources;
