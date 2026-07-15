import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, BookX } from "lucide-react";
import { Resource } from "../types";
import { getResourcesRequest } from "../api/resources";
import { SUBJECTS, RESOURCE_TYPES, PRICE_TYPES, SORT_OPTIONS } from "../constants";
import ResourceCard from "../components/ui/ResourceCard";
import SkeletonCard from "../components/ui/SkeletonCard";
import EmptyState from "../components/ui/EmptyState";

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const search = searchParams.get("search") || "";
  const subject = searchParams.get("subject") || "";
  const priceType = searchParams.get("priceType") || "";
  const resourceType = searchParams.get("resourceType") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.delete("page");
    setSearchParams(next);
  };

  useEffect(() => {
    setLoading(true);
    getResourcesRequest({ search, subject, priceType, resourceType, sort, page, limit: 12 })
      .then((res) => {
        const payload = Array.isArray(res) ? res : res.data ?? [];
        setResources(Array.isArray(payload) ? payload : []);
        setTotalPages(res.totalPages ?? 1);
        setTotalResults(res.totalResults ?? payload.length);
      })
      .catch(() => setResources([]))
      .finally(() => setLoading(false));
  }, [search, subject, priceType, resourceType, sort, page]);

  return (
    <div className="container-page py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold text-slate-800">Explore Resources</h1>
        <p className="text-slate-500 mt-1">{totalResults} resources shared by students across Bangladesh</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <aside className="lg:w-64 shrink-0">
          <div className="index-card p-5 lg:sticky lg:top-24">
            <div className="flex items-center gap-2 mb-4 text-slate-700">
              <SlidersHorizontal size={16} />
              <span className="text-sm font-semibold">Filters</span>
            </div>

            <div className="relative mb-5">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                defaultValue={search}
                onKeyDown={(e) => e.key === "Enter" && updateParam("search", (e.target as HTMLInputElement).value)}
                onBlur={(e) => updateParam("search", e.target.value)}
                placeholder="Search title or keyword"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-full border border-slate-200 focus:outline-none focus:border-indigo-400"
              />
            </div>

            <div className="mb-5">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Subject</p>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="radio" name="subject" checked={subject === ""} onChange={() => updateParam("subject", "")} />
                  All subjects
                </label>
                {SUBJECTS.map((s) => (
                  <label key={s} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="radio"
                      name="subject"
                      checked={subject === s}
                      onChange={() => updateParam("subject", s)}
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Price</p>
              <div className="flex gap-2">
                {["", ...PRICE_TYPES.map((p) => p.value)].map((val) => (
                  <button
                    key={val || "all"}
                    onClick={() => updateParam("priceType", val)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      priceType === val
                        ? "bg-indigo-500 text-white border-indigo-500"
                        : "border-slate-200 text-slate-600 hover:border-indigo-300"
                    }`}
                  >
                    {val === "" ? "All" : val === "free" ? "Free" : "Paid"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Resource Type</p>
              <div className="flex flex-wrap gap-2">
                {["", ...RESOURCE_TYPES.map((r) => r.value)].map((val) => (
                  <button
                    key={val || "all"}
                    onClick={() => updateParam("resourceType", val)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      resourceType === val
                        ? "bg-indigo-500 text-white border-indigo-500"
                        : "border-slate-200 text-slate-600 hover:border-indigo-300"
                    }`}
                  >
                    {val === "" ? "All" : RESOURCE_TYPES.find((r) => r.value === val)?.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <div className="flex justify-end mb-5">
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="text-sm border border-slate-200 rounded-full px-4 py-2 focus:outline-none focus:border-indigo-400"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  Sort: {o.label}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : resources.length === 0 ? (
            <EmptyState
              icon={<BookX size={26} />}
              title="No resources match your filters"
              description="Try clearing a filter or searching a different keyword."
              actionLabel="Clear filters"
              actionTo="/resources"
            />
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {resources.map((r) => <ResourceCard key={r._id} resource={r} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                disabled={page <= 1}
                onClick={() => updateParam("page", String(page - 1))}
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-slate-600 px-2">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => updateParam("page", String(page + 1))}
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
