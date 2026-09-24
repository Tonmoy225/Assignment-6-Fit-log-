import { Clock, Flame, Star } from "lucide-react";

// duration / calories / rating row with icons
export default function Stats({ workout, iconClass = "text-muted" }) {
  return (
    <div className="flex items-center gap-4 text-xs text-muted">
      <span className="flex items-center gap-1.5">
        <Clock size={14} className={iconClass} /> {workout.duration} min
      </span>
      <span className="flex items-center gap-1.5">
        <Flame size={14} className={iconClass} /> {workout.calories} kcal
      </span>
      <span className="flex items-center gap-1.5">
        <Star size={14} className={iconClass} /> {workout.rating}
      </span>
    </div>
  );
}
