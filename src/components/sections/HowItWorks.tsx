import { UserPlus, Upload, Users } from "lucide-react";

const steps = [
  {
    icon: <UserPlus size={20} />,
    title: "Create your account",
    description: "Sign up with your university email and tell us what you're studying.",
  },
  {
    icon: <Upload size={20} />,
    title: "Share or find resources",
    description: "Upload your notes for others, or search the library for what you need.",
  },
  {
    icon: <Users size={20} />,
    title: "Learn together",
    description: "Join a study group or book a tutor session to lock in what you've learned.",
  },
];

const HowItWorks = () => {
  return (
    <section className="container-page py-20">
      <div className="text-center mb-12">
        <span className="text-xs font-medium uppercase tracking-wider text-indigo-500">Process</span>
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-slate-800 mt-1">
          How StudyNest works
        </h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-8 relative">
        {steps.map((step, i) => (
          <div key={step.title} className="relative text-center px-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500 text-white flex items-center justify-center mb-4">
              {step.icon}
            </div>
            <span className="text-xs font-semibold text-amber-500">STEP {i + 1}</span>
            <h3 className="font-display font-semibold text-slate-800 mt-1 mb-2">{step.title}</h3>
            <p className="text-sm text-slate-500">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
