import { Link } from "react-router-dom";
import { BookX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="container-page py-32 text-center">
      <span className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto mb-5">
        <BookX size={28} />
      </span>
      <h1 className="text-3xl font-display font-semibold text-slate-800">Page not found</h1>
      <p className="text-slate-500 mt-2">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="inline-block mt-6 px-6 py-2.5 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
