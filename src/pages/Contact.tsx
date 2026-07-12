import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="container-page py-16">
      <div className="text-center mb-12">
        <span className="text-xs font-medium uppercase tracking-wider text-indigo-500">Contact</span>
        <h1 className="text-4xl font-display font-semibold text-slate-800 mt-2">Get in touch</h1>
        <p className="text-slate-500 mt-2">Questions, feedback, or partnership ideas — we'd love to hear from you.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="lg:col-span-2 index-card p-6">
          {sent ? (
            <div className="text-center py-10">
              <p className="text-lg font-display font-semibold text-slate-800">Message sent!</p>
              <p className="text-sm text-slate-500 mt-2">We'll get back to you within 1-2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
                />
              </div>
              <button className="w-full py-3 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors">
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <div className="index-card p-5 flex items-start gap-3">
            <Mail size={18} className="text-indigo-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-800">Email</p>
              <p className="text-sm text-slate-500">hello@studynest.com</p>
            </div>
          </div>
          <div className="index-card p-5 flex items-start gap-3">
            <Phone size={18} className="text-indigo-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-800">Phone</p>
              <p className="text-sm text-slate-500">+880 1XXX-XXXXXX</p>
            </div>
          </div>
          <div className="index-card p-5 flex items-start gap-3">
            <MapPin size={18} className="text-indigo-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-800">Office</p>
              <p className="text-sm text-slate-500">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
