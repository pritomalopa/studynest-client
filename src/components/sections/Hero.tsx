import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query ? `/resources?search=${encodeURIComponent(query)}` : "/resources");
  };

  return (
    <section className="relative min-h-[62vh] flex items-center overflow-hidden bg-indigo-900">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-700/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl" />
      </div>

      <div className="container-page relative py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-medium mb-5">
            <Sparkles size={12} /> Built for university students in Bangladesh
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-white leading-tight">
            Your campus knowledge, connected.
          </h1>
          <p className="mt-4 text-indigo-100 text-lg max-w-md">
            Share notes, form study groups, and book verified tutors — one nest for everything you need to study smarter.
          </p>

          <form onSubmit={handleSearch} className="mt-8 flex bg-white rounded-full p-1.5 shadow-lg max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes, subjects, or tutors..."
              className="flex-1 bg-transparent px-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors"
            >
              <Search size={16} /> Search
            </button>
          </form>

          <div className="mt-6 flex gap-3">
            <a href="/resources" className="px-5 py-2.5 rounded-full bg-white text-indigo-700 text-sm font-medium hover:bg-indigo-50 transition-colors">
              Explore Resources
            </a>
            <a href="/register" className="px-5 py-2.5 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors">
              Become a Tutor
            </a>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="index-card bg-white p-5 rotate-[-4deg] shadow-2xl w-64 ml-auto">
            <div className="h-2 w-10 rounded-full bg-amber-400 mb-3" />
            <p className="font-display font-semibold text-slate-800 text-sm">DSA Full Semester Notes</p>
            <p className="text-xs text-slate-500 mt-1">Computer Science • Free</p>
          </div>
          <div className="index-card bg-white p-5 rotate-[3deg] shadow-2xl w-64 mt-6">
            <div className="h-2 w-10 rounded-full bg-emerald-400 mb-3" />
            <p className="font-display font-semibold text-slate-800 text-sm">Physiology Summary Notes</p>
            <p className="text-xs text-slate-500 mt-1">Medical • Free</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
