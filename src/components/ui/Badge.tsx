import { ReactNode } from "react";

type Tone = "indigo" | "amber" | "emerald" | "slate";

const toneClasses: Record<Tone, string> = {
  indigo: "bg-indigo-50 text-indigo-600",
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-600",
  slate: "bg-slate-100 text-slate-600",
};

const Badge = ({ children, tone = "slate" }: { children: ReactNode; tone?: Tone }) => (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${toneClasses[tone]}`}>
    {children}
  </span>
);

export default Badge;
