"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CalendarPlus, Bookmark } from "lucide-react";
import { useApp, PLAN_LIMIT } from "@/context/AppContext";
import { fetchWorkout } from "@/lib/api";
import Spinner from "@/components/Spinner";
import NotFoundView from "@/components/NotFoundView";
import WorkoutImage from "@/components/WorkoutImage";

export default function WorkoutDetails() {
  const { id } = useParams();
  const { plan, saved, addToPlan, saveForLater } = useApp();

  // result remembers which id it belongs to
  const [result, setResult] = useState({ id: null, workout: null });

  useEffect(() => {
    fetchWorkout(id)
      .then((data) => setResult({ id, workout: data }))
      .catch(() => setResult({ id, workout: null }));
  }, [id]);

  const loading = result.id !== id;
  const workout = result.workout;

  if (loading) return <Spinner text="Loading workout…" />;

  if (!workout) {
    return (
      <NotFoundView
        title="Workout not found"
        text="We could not find this workout. It may have been removed."
      />
    );
  }

  const inPlan = plan.includes(workout.id);
  const planFull = plan.length >= PLAN_LIMIT && !inPlan;

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.calories} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-14">
      {/* left: image */}
      <div>
        <WorkoutImage
          src={workout.image}
          alt={workout.name}
          className="aspect-[4/5] w-full rounded-3xl"
        />
      </div>

      {/* right: details */}
      <div>
        <h1 className="font-display text-4xl font-semibold uppercase sm:text-5xl">
          {workout.name}
        </h1>
        <p className="mt-4 max-w-xl text-muted">{workout.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {workout.categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-accent px-3 py-1 text-xs font-bold capitalize text-black"
            >
              {cat.toLowerCase()}
            </span>
          ))}
        </div>

        {/* specs */}
        <div className="mt-8 rounded-2xl border border-line bg-panel px-6 py-2">
          {specs.map(([label, value], i) => (
            <div
              key={label}
              className={`flex items-center justify-between py-4 text-sm ${
                i !== specs.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                {label}
              </span>
              <span>{value}</span>
            </div>
          ))}
        </div>

        {/* instructions */}
        <h2 className="mt-10 text-sm font-bold uppercase tracking-wider">Instructions</h2>
        <ol className="mt-4 space-y-3 text-sm text-muted">
          {workout.instructions.map((step, i) => (
            <li key={i}>
              {i + 1}. {step}
            </li>
          ))}
        </ol>

        {/* buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => addToPlan(workout)}
            disabled={planFull}
            className="flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-black transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CalendarPlus size={16} />
            Add to today&apos;s plan
          </button>
          <button
            onClick={() => saveForLater(workout)}
            className="flex items-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-semibold transition hover:border-accent"
          >
            <Bookmark size={16} />
            {saved.includes(workout.id) ? "Saved" : "Save for later"}
          </button>
        </div>
        {planFull && (
          <p className="mt-3 text-xs text-muted">
            Today&apos;s plan is full (five lifts). Finish or remove one first.
          </p>
        )}
      </div>
    </div>
  );
}
