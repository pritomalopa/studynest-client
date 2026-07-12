import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { SUBJECTS } from "../constants";
import GoogleIcon from "../components/ui/GoogleIcon";

const Register = () => {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [googleLoading, setGoogleLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    isTutor: false,
    tutorSubjects: [] as string[],
    hourlyRate: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleGoogleSignup = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const update = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    if (form.password.length < 8 || !/\d/.test(form.password)) {
      return "Password must be at least 8 characters and include a number.";
    }
    if (form.password !== form.confirmPassword) {
      return "Passwords don't match.";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        university: form.university,
        isTutor: form.isTutor,
        tutorSubjects: form.tutorSubjects,
        hourlyRate: form.hourlyRate ? Number(form.hourlyRate) : 0,
      });
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Couldn't create your account.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleSubject = (subject: string) => {
    setForm((f) => ({
      ...f,
      tutorSubjects: f.tutorSubjects.includes(subject)
        ? f.tutorSubjects.filter((s) => s !== subject)
        : [...f.tutorSubjects, subject],
    }));
  };

  return (
    <div className="container-page py-16 max-w-md">
      <div className="text-center mb-8">
        <span className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center mx-auto mb-3">
          <BookOpen size={22} />
        </span>
        <h1 className="text-2xl font-display font-semibold text-slate-800">Create your account</h1>
        <p className="text-sm text-slate-500 mt-1">Join StudyNest and start learning together.</p>
      </div>

      <div className="index-card p-6 space-y-4">
        {error && <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60 transition-colors"
        >
          <GoogleIcon /> {googleLoading ? "Signing in..." : "Continue with Google"}
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-xs text-slate-400">or sign up with email</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700">Full Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@university.edu"
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">University</label>
          <input
            value={form.university}
            onChange={(e) => update("university", e.target.value)}
            placeholder="e.g. University of Dhaka"
            className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Confirm</label>
            <input
              required
              type="password"
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
            />
          </div>
        </div>
        <p className="text-xs text-slate-400 -mt-2">Minimum 8 characters, at least 1 number.</p>

        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer pt-1">
          <input type="checkbox" checked={form.isTutor} onChange={(e) => update("isTutor", e.target.checked)} />
          I want to also offer tutoring sessions
        </label>

        {form.isTutor && (
          <div className="space-y-3 pt-1">
            <div>
              <label className="text-sm font-medium text-slate-700">Subjects you can teach</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {SUBJECTS.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => toggleSubject(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      form.tutorSubjects.includes(s) ? "bg-indigo-500 text-white border-indigo-500" : "border-slate-200 text-slate-600"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Hourly Rate (৳)</label>
              <input
                type="number"
                min={0}
                value={form.hourlyRate}
                onChange={(e) => update("hourlyRate", e.target.value)}
                className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
              />
            </div>
          </div>
        )}

        <button
          disabled={submitting}
          className="w-full py-3 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 disabled:opacity-60 transition-colors"
        >
          {submitting ? "Creating account..." : "Create Account"}
        </button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Already have an account? <Link to="/login" className="text-indigo-600 font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
