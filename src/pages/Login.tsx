import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import GoogleIcon from "../components/ui/GoogleIcon";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || "Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail("nusrat.jahan@studynest.com");
    setPassword("Password123");
  };

  return (
    <div className="container-page py-16 max-w-md">
      <div className="text-center mb-8">
        <span className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center mx-auto mb-3">
          <BookOpen size={22} />
        </span>
        <h1 className="text-2xl font-display font-semibold text-slate-800">Welcome back</h1>
        <p className="text-sm text-slate-500 mt-1">Log in to continue to StudyNest.</p>
      </div>

      <div className="index-card p-6 space-y-4">
        {error && <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60 transition-colors"
        >
          <GoogleIcon /> {googleLoading ? "Signing in..." : "Continue with Google"}
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-xs text-slate-400">or</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
            />
          </div>

          <button
            disabled={submitting}
            className="w-full py-3 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 disabled:opacity-60 transition-colors"
          >
            {submitting ? "Logging in..." : "Log In"}
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-3 rounded-full border border-dashed border-indigo-300 text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            Use Demo Student Login
          </button>
        </form>

        <p className="text-center text-sm text-slate-500">
          New to StudyNest? <Link to="/register" className="text-indigo-600 font-medium">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

