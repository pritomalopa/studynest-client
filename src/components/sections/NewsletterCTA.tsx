import { useState } from "react";
import { Link } from "react-router-dom";

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="container-page pb-24">
      <div className="index-card bg-indigo-500 border-none text-center px-6 py-14">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white">
          Ready to study smarter?
        </h2>
        <p className="text-indigo-100 mt-2 max-w-md mx-auto">
          Join thousands of students already sharing resources and learning together on StudyNest.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
          <Link to="/register" className="px-6 py-3 rounded-full bg-white text-indigo-700 text-sm font-medium hover:bg-indigo-50 transition-colors">
            Create your free account
          </Link>
          <Link to="/resources" className="px-6 py-3 rounded-full border border-white/40 text-white text-sm font-medium hover:bg-white/10 transition-colors">
            Browse resources first
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex max-w-sm mx-auto mt-8 bg-white/10 rounded-full p-1.5">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Get study tips in your inbox"
            className="flex-1 bg-transparent px-4 text-sm text-white placeholder:text-indigo-200 focus:outline-none"
          />
          <button type="submit" className="px-4 py-2 rounded-full bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors">
            {submitted ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterCTA;
