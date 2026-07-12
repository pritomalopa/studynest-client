import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin, Facebook, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-24">
      <div className="container-page py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg text-white mb-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center">
              <BookOpen size={18} />
            </span>
            StudyNest
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            Your campus knowledge, connected. Notes, study groups, and tutors — all in one nest.
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3 text-sm">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/resources" className="hover:text-white transition-colors">Browse Resources</Link></li>
            <li><Link to="/study-groups" className="hover:text-white transition-colors">Study Groups</Link></li>
            <li><Link to="/tutors" className="hover:text-white transition-colors">Find a Tutor</Link></li>
            <li><Link to="/resources/add" className="hover:text-white transition-colors">Share a Resource</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/privacy-terms" className="hover:text-white transition-colors">Privacy &amp; Terms</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3 text-sm">Contact</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2"><Mail size={14} /> hello@studynest.com</li>
            <li className="flex items-center gap-2"><Phone size={14} /> +880 1XXX-XXXXXX</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> Dhaka, Bangladesh</li>
          </ul>
          <div className="flex items-center gap-3 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500 transition-colors">
              <Facebook size={14} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500 transition-colors">
              <Linkedin size={14} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500 transition-colors">
              <Github size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-page py-5 text-xs text-slate-500 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} StudyNest. All rights reserved.</span>
          <span>Built for students, by a student.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
