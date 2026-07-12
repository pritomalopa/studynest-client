import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
}

const EmptyState = ({ icon, title, description, actionLabel, actionTo }: Props) => (
  <div className="flex flex-col items-center justify-center text-center py-20 px-4">
    <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
    <p className="text-slate-500 max-w-sm mb-5">{description}</p>
    {actionLabel && actionTo && (
      <Link
        to={actionTo}
        className="px-5 py-2.5 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors"
      >
        {actionLabel}
      </Link>
    )}
  </div>
);

export default EmptyState;
