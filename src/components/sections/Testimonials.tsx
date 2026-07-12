const testimonials = [
  {
    name: "Nusrat Jahan",
    role: "CSE Student, University of Dhaka",
    quote:
      "I found IELTS writing templates that actually matched my exam. StudyNest saved me weeks of searching Facebook groups.",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    name: "Rafiul Islam",
    role: "EEE Student, BUET",
    quote:
      "Booking a tutor for Signals & Systems the night before my quiz was the best decision I made that semester.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    name: "Farzana Akter",
    role: "MBBS Student, Dhaka Medical College",
    quote:
      "Our physiology study group meets every week now because of StudyNest. We've all improved our card exam scores.",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container-page">
        <div className="text-center mb-12">
          <span className="text-xs font-medium uppercase tracking-wider text-indigo-500">Testimonials</span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-slate-800 mt-1">
            What students say
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="index-card p-6">
              <p className="text-sm text-slate-600 leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3 mt-5">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium text-slate-800">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
