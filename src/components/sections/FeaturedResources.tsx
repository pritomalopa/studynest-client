import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Resource } from "../../types";
import { getResourcesRequest } from "../../api/resources";
import ResourceCard from "../ui/ResourceCard";
import SkeletonCard from "../ui/SkeletonCard";

const FeaturedResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResourcesRequest({ sort: "rating", limit: 4 })
      .then((res) => setResources(Array.isArray(res) ? res : res.data ?? []))
      .catch(() => setResources([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container-page py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-indigo-500">Top rated</span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-slate-800 mt-1">
            Featured Resources
          </h2>
        </div>
        <Link to="/resources" className="hidden sm:flex items-center gap-1 text-sm font-medium text-indigo-600 hover:gap-2 transition-all">
          View all <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : resources.map((r) => <ResourceCard key={r._id} resource={r} />)}
      </div>
    </section>
  );
};

export default FeaturedResources;
