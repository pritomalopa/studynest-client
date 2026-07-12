const posts = [
  {
    title: "5 Note-Taking Methods That Actually Help You Remember",
    excerpt:
      "From Cornell notes to mind mapping — a breakdown of which method fits which kind of course, and how to pick one before your next lecture.",
    image: "https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg",
    date: "June 2, 2026",
    category: "Study Tips",
  },
  {
    title: "How to Form a Study Group That Doesn't Fall Apart After Week 2",
    excerpt:
      "The difference between a group that meets every week for a full semester and one that quietly dies usually comes down to three things.",
    image: "https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg",
    date: "May 18, 2026",
    category: "Community",
  },
  {
    title: "Getting the Most Out of a One-Hour Tutor Session",
    excerpt:
      "A one-hour session goes fast. Here's how to prepare questions in advance so you leave with real clarity, not just more confusion.",
    image: "https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg",
    date: "April 30, 2026",
    category: "Tutoring",
  },
  {
    title: "A Realistic Study Schedule for Exam Season",
    excerpt:
      "Cramming works until it doesn't. Here's a schedule template that spreads revision across two weeks without burning you out.",
    image: "https://images.pexels.com/photos/4143791/pexels-photo-4143791.jpeg",
    date: "April 9, 2026",
    category: "Study Tips",
  },
];

const Blog = () => {
  return (
    <div className="container-page py-16">
      <div className="text-center mb-12">
        <span className="text-xs font-medium uppercase tracking-wider text-indigo-500">Blog</span>
        <h1 className="text-4xl font-display font-semibold text-slate-800 mt-2">Study smarter, not just harder</h1>
        <p className="text-slate-500 mt-2">Practical advice from students who've been through it.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {posts.map((post) => (
          <article key={post.title} className="index-card overflow-hidden">
            <img src={post.image} alt={post.title} className="h-44 w-full object-cover" />
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="text-indigo-500 font-medium">{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h2 className="font-display font-semibold text-slate-800 leading-snug">{post.title}</h2>
              <p className="text-sm text-slate-500 mt-2 line-clamp-3">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
