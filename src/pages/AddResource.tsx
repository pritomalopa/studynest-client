import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createResourceRequest } from "../api/resources";
import { SUBJECTS, RESOURCE_TYPES } from "../constants";

const AddResource = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    subject: SUBJECTS[0],
    resourceType: "notes",
    priceType: "free",
    price: "0",
    coverImageUrl: "",
    fileUrl: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await createResourceRequest({
        ...form,
        priceType: form.priceType as "free" | "paid",
        resourceType: form.resourceType as any,
        price: Number(form.price),
      });
      navigate("/resources/manage");
    } catch (err: any) {
      setError(err.response?.data?.message || "Couldn't add resource. Please check your inputs.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-page py-12 max-w-2xl">
      <h1 className="text-3xl font-display font-semibold text-slate-800">Add a Resource</h1>
      <p className="text-slate-500 mt-1 mb-8">Share your notes, slides, books, or videos with fellow students.</p>

      <form onSubmit={handleSubmit} className="index-card p-6 space-y-5">
        {error && <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

        <div>
          <label className="text-sm font-medium text-slate-700">Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. Data Structures & Algorithms — Full Semester Notes"
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Short Description</label>
          <input
            required
            value={form.shortDescription}
            onChange={(e) => update("shortDescription", e.target.value)}
            placeholder="One line shown on the resource card"
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Full Description</label>
          <textarea
            required
            rows={4}
            value={form.fullDescription}
            onChange={(e) => update("fullDescription", e.target.value)}
            placeholder="What does this resource cover? Who is it useful for?"
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Subject</label>
            <select
              value={form.subject}
              onChange={(e) => update("subject", e.target.value)}
              className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
            >
              {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Resource Type</label>
            <select
              value={form.resourceType}
              onChange={(e) => update("resourceType", e.target.value)}
              className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
            >
              {RESOURCE_TYPES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 items-end">
          <div>
            <label className="text-sm font-medium text-slate-700">Price Type</label>
            <div className="mt-1.5 flex gap-2">
              {["free", "paid"].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => update("priceType", p)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                    form.priceType === p ? "bg-indigo-500 text-white border-indigo-500" : "border-slate-200 text-slate-600"
                  }`}
                >
                  {p === "free" ? "Free" : "Paid"}
                </button>
              ))}
            </div>
          </div>
          {form.priceType === "paid" && (
            <div>
              <label className="text-sm font-medium text-slate-700">Price (৳)</label>
              <input
                type="number"
                min={1}
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
              />
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Cover Image URL (optional)</label>
          <input
            value={form.coverImageUrl}
            onChange={(e) => update("coverImageUrl", e.target.value)}
            placeholder="https://..."
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Resource File/Link URL</label>
          <input
            required
            value={form.fileUrl}
            onChange={(e) => update("fileUrl", e.target.value)}
            placeholder="Google Drive, GitHub, or any accessible link"
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <button
          disabled={submitting}
          className="w-full py-3 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 disabled:opacity-60 transition-colors"
        >
          {submitting ? "Submitting..." : "Submit Resource"}
        </button>
      </form>
    </div>
  );
};

export default AddResource;
