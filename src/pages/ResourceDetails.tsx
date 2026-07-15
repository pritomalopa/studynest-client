import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Download, MapPin, Calendar, FileText, Star } from "lucide-react";
import { Resource, Review } from "../types";
import { getResourceByIdRequest, addReviewRequest } from "../api/resources";
import { useAuth } from "../context/AuthContext";
import Badge from "../components/ui/Badge";
import StarRating from "../components/ui/StarRating";

const ResourceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [resource, setResource] = useState<Resource | null>(null);
  const [related, setRelated] = useState<Resource[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reviewMsg, setReviewMsg] = useState("");

  const load = () => {
    if (!id) return;
    setLoading(true);
    getResourceByIdRequest(id)
      .then(({ resource, related, reviews }) => {
        setResource(resource);
        setRelated(related);
        setReviews(reviews);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSubmitting(true);
    setReviewMsg("");
    try {
      await addReviewRequest(id, rating, comment);
      setComment("");
      setRating(5);
      load();
    } catch (err: any) {
      setReviewMsg(err.response?.data?.message || "Couldn't submit your review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container-page py-24 text-center text-slate-400">Loading resource...</div>;
  }

  if (!resource) {
    return <div className="container-page py-24 text-center text-slate-400">Resource not found.</div>;
  }

  const uploader = typeof resource.uploader === "object" ? resource.uploader : null;

  return (
    <div className="container-page py-12">
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <img src={resource.coverImageUrl} alt={resource.title} className="w-full h-72 object-cover rounded-2xl" />

          <div className="flex items-center gap-2 mt-5">
            <Badge tone="indigo">{resource.subject}</Badge>
            <Badge tone={resource.priceType === "free" ? "emerald" : "amber"}>
              {resource.priceType === "free" ? "Free" : `৳${resource.price}`}
            </Badge>
            <Badge tone="slate">{resource.resourceType}</Badge>
          </div>

          <h1 className="text-3xl font-display font-semibold text-slate-800 mt-4">{resource.title}</h1>

          <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
            <span className="flex items-center gap-1"><StarRating rating={resource.avgRating} /> {resource.avgRating.toFixed(1)} ({resource.reviewCount} reviews)</span>
            <span className="flex items-center gap-1"><Download size={14} /> {resource.downloadCount} downloads</span>
          </div>

          <section className="mt-8">
            <h2 className="text-lg font-display font-semibold text-slate-800 mb-2">Overview</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">{resource.fullDescription}</p>
          </section>

          <section className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="index-card p-4">
              <FileText size={16} className="text-indigo-500 mb-2" />
              <p className="text-xs text-slate-500">Type</p>
              <p className="text-sm font-medium text-slate-800 capitalize">{resource.resourceType}</p>
            </div>
            <div className="index-card p-4">
              <MapPin size={16} className="text-indigo-500 mb-2" />
              <p className="text-xs text-slate-500">Subject</p>
              <p className="text-sm font-medium text-slate-800">{resource.subject}</p>
            </div>
            <div className="index-card p-4">
              <Calendar size={16} className="text-indigo-500 mb-2" />
              <p className="text-xs text-slate-500">Uploaded</p>
              <p className="text-sm font-medium text-slate-800">
                {new Date(resource.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
            <div className="index-card p-4">
              <Star size={16} className="text-indigo-500 mb-2" />
              <p className="text-xs text-slate-500">Rating</p>
              <p className="text-sm font-medium text-slate-800">{resource.avgRating.toFixed(1)} / 5</p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-display font-semibold text-slate-800 mb-4">
              Reviews ({reviews.length})
            </h2>

            {reviews.length === 0 ? (
              <p className="text-sm text-slate-500">No reviews yet — be the first to leave one.</p>
            ) : (
              <div className="space-y-4 mb-8">
                {reviews.map((r) => (
                  <div key={r._id} className="index-card p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={r.user.avatarUrl || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"}
                          className="w-8 h-8 rounded-full object-cover"
                          alt={r.user.name}
                        />
                        <span className="text-sm font-medium text-slate-800">{r.user.name}</span>
                      </div>
                      <StarRating rating={r.rating} />
                    </div>
                    <p className="text-sm text-slate-600 mt-3">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {user ? (
              <form onSubmit={handleReview} className="index-card p-5">
                <p className="text-sm font-medium text-slate-700 mb-2">Leave a review</p>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button type="button" key={n} onClick={() => setRating(n)}>
                      <Star size={20} className={n <= rating ? "fill-amber-500 text-amber-500" : "text-slate-200"} />
                    </button>
                  ))}
                </div>
                <textarea
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts about this resource..."
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
                />
                {reviewMsg && <p className="text-xs text-red-500 mt-2">{reviewMsg}</p>}
                <button
                  disabled={submitting}
                  className="mt-3 px-5 py-2 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            ) : (
              <p className="text-sm text-slate-500">
                <Link to="/login" className="text-indigo-600 font-medium">Log in</Link> to leave a review.
              </p>
            )}
          </section>
        </div>

        <aside>
          <div className="index-card p-5 sticky top-24">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Shared by</p>
            <div className="flex items-center gap-3">
              <img
                src={uploader?.avatarUrl || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"}
                className="w-11 h-11 rounded-full object-cover"
                alt={uploader?.name}
              />
              <div>
                <p className="text-sm font-medium text-slate-800">{uploader?.name || "StudyNest user"}</p>
                <p className="text-xs text-slate-500">{uploader?.university}</p>
              </div>
            </div>
            <a
              href={resource.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors"
            >
              <Download size={16} /> Access Resource
            </a>
          </div>

          {related.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Related resources</p>
              <div className="space-y-4">
                {related.map((r) => (
                  <Link key={r._id} to={`/resources/${r._id}`} className="index-card flex gap-3 p-3">
                    <img src={r.coverImageUrl} className="w-16 h-16 rounded-lg object-cover" alt={r.title} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 line-clamp-2">{r.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{r.priceType === "free" ? "Free" : `৳${r.price}`}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ResourceDetails;
