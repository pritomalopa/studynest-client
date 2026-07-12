import { Link } from "react-router-dom";
import { Code2, Briefcase, Cpu, Stethoscope, Languages, Scale, Sigma, Users2 } from "lucide-react";
import { SUBJECTS } from "../../constants";

const icons: Record<string, JSX.Element> = {
  "Computer Science": <Code2 size={20} />,
  Business: <Briefcase size={20} />,
  Engineering: <Cpu size={20} />,
  Medical: <Stethoscope size={20} />,
  Language: <Languages size={20} />,
  Law: <Scale size={20} />,
  Mathematics: <Sigma size={20} />,
  "Social Science": <Users2 size={20} />,
};

const CategoriesSection = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container-page">
        <div className="text-center mb-10">
          <span className="text-xs font-medium uppercase tracking-wider text-indigo-500">Browse</span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-slate-800 mt-1">
            Find resources by subject
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SUBJECTS.map((subject) => (
            <Link
              key={subject}
              to={`/resources?subject=${encodeURIComponent(subject)}`}
              className="index-card flex flex-col items-center justify-center text-center gap-3 py-8 px-3 hover:border-indigo-300"
            >
              <span className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                {icons[subject]}
              </span>
              <span className="text-sm font-medium text-slate-700">{subject}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
