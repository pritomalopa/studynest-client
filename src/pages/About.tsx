import { Users, Target, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="container-page py-16 max-w-3xl">
      <span className="text-xs font-medium uppercase tracking-wider text-indigo-500">About Us</span>
      <h1 className="text-4xl font-display font-semibold text-slate-800 mt-2">
        Built by a student, for students.
      </h1>
      <p className="text-slate-600 leading-relaxed mt-5">
        StudyNest started as a simple frustration: notes scattered across Facebook groups,
        Messenger threads, and forgotten Google Drive links. Finding the right resource before
        an exam meant scrolling through hundreds of messages hoping someone shared what you needed.
        We built StudyNest to fix that — one organized place where students across Bangladesh
        can share notes, form study groups, and connect with tutors who've already been through
        the course.
      </p>
      <p className="text-slate-600 leading-relaxed mt-4">
        Today, StudyNest is used by students from universities across the country, from BUET to
        Dhaka Medical College, sharing everything from handwritten problem sets to full lecture
        slide decks.
      </p>

      <div className="grid sm:grid-cols-3 gap-6 mt-12">
        <div className="index-card p-6">
          <Target size={22} className="text-indigo-500 mb-3" />
          <h3 className="font-display font-semibold text-slate-800 mb-1">Our Mission</h3>
          <p className="text-sm text-slate-500">Make quality study resources accessible to every student, regardless of which university they attend.</p>
        </div>
        <div className="index-card p-6">
          <Users size={22} className="text-indigo-500 mb-3" />
          <h3 className="font-display font-semibold text-slate-800 mb-1">Our Community</h3>
          <p className="text-sm text-slate-500">Thousands of students helping each other through shared notes, study groups, and peer tutoring.</p>
        </div>
        <div className="index-card p-6">
          <Heart size={22} className="text-indigo-500 mb-3" />
          <h3 className="font-display font-semibold text-slate-800 mb-1">Our Values</h3>
          <p className="text-sm text-slate-500">Free access first, fair pricing for premium content, and respect for the people who take time to share.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
