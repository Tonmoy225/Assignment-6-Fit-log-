import Link from "next/link";
import WorkoutImage from "./WorkoutImage";
import Stats from "./Stats";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="block overflow-hidden rounded-2xl border border-line bg-card transition hover:-translate-y-1 hover:border-accent/50"
    >
      <WorkoutImage src={workout.image} alt={workout.name} className="h-48 w-full" />
      <div className="p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase text-black"
            >
              {cat}
            </span>
          ))}
        </div>
        <h3 className="font-display text-xl font-semibold uppercase">{workout.name}</h3>
        <p className="mt-1 text-xs text-muted">{workout.equipment}</p>
        <div className="mt-5 border-t border-line pt-4">
          <Stats workout={workout} />
        </div>
      </div>
    </Link>
  );
}
