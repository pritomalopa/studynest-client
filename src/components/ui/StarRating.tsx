import { Star } from "lucide-react";

const StarRating = ({ rating, size = 14 }: { rating: number; size?: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? "fill-amber-500 text-amber-500" : "text-slate-200"}
        />
      ))}
    </div>
  );
};

export default StarRating;
