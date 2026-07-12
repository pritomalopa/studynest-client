import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { Resource } from "../../types";
import Badge from "./Badge";

const FALLBACK_IMG =
  "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg";

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const uploaderName =
    typeof resource.uploader === "object" ? resource.uploader.name : "StudyNest user";

  return (
    <Link to={`/resources/${resource._id}`} className="index-card flex flex-col h-full overflow-hidden group">
      <div className="relative h-40 w-full overflow-hidden rounded-t-2xl bg-slate-100">
        <img
          src={resource.coverImageUrl}
          alt={resource.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMG;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge tone={resource.priceType === "free" ? "emerald" : "amber"}>
            {resource.priceType === "free" ? "Free" : `৳${resource.price}`}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <Badge tone="indigo">{resource.subject}</Badge>
        <h3 className="mt-2 font-display font-semibold text-slate-800 leading-snug line-clamp-2">
          {resource.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500 line-clamp-2 flex-1">
          {resource.shortDescription}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {uploaderName}
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} className="fill-amber-500 text-amber-500" />
            {resource.avgRating.toFixed(1)} ({resource.reviewCount})
          </span>
        </div>

        <span className="mt-4 inline-flex items-center justify-center w-full py-2 rounded-full border border-indigo-500 text-indigo-500 text-sm font-medium group-hover:bg-indigo-500 group-hover:text-white transition-colors">
          View Details
        </span>
      </div>
    </Link>
  );
};

export default ResourceCard;
