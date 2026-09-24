"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { sortWorkouts } from "@/lib/api";
import Spinner from "@/components/Spinner";
import SortDropdown from "@/components/SortDropdown";
import WorkoutImage from "@/components/WorkoutImage";
import Stats from "@/components/Stats";

export default function MyPlan() {
  const {
    workouts,
    loading,
    hydrated,
    plan,
    saved,
    done,
    removeFromPlan,
    removeFromSaved,
    markDone,
  } = useApp();

  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  // turn saved ids into full workout objects
  const planItems = workouts.filter((w) => plan.includes(w.id));
  const savedItems = workouts.filter((w) => saved.includes(w.id));

  const totalMinutes = planItems.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = planItems.reduce((sum, w) => sum + w.calories, 0);

  const list = sortWorkouts(tab === "plan" ? planItems : savedItems, sortBy);

  const tabClass = (name) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition ${
      tab === name ? "bg-[#262a35] text-white" : "text-muted hover:text-white"
    }`;

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <h1 className="font-display text-4xl font-semibold uppercase">My Plan</h1>
      <p className="mt-2 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* metrics */}
      <div className="mt-8 grid grid-cols-3 rounded-2xl border border-line bg-panel">
        <Metric label="Exercises" value={planItems.length} accent />
        <Metric label="Minutes" value={totalMinutes} border />
        <Metric label="Calories" value={totalCalories} border />
      </div>

      

      {/* list */}
      <div className="mt-6">
        {loading || !hydrated ? (
          <Spinner />
        ) : list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line px-6 py-20 text-center">
            <h2 className="font-display text-2xl font-semibold uppercase">
              Nothing here yet
            </h2>
            <p className="mt-2 text-sm text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-black"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {list.map((w) => {
              const isDone = done.includes(w.id);
              return (
                <div
                  key={w.id}
                  className={`flex flex-col gap-4 rounded-2xl border border-line bg-card p-4 sm:flex-row sm:items-center ${
                    isDone && tab === "plan" ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex flex-1 items-center gap-4">
                    <WorkoutImage
                      src={w.image}
                      alt={w.name}
                      className="h-16 w-28 shrink-0 rounded-lg"
                    />
                    <div>
                      <h3 className="font-display text-lg font-semibold uppercase">
                        {w.name}
                      </h3>
                      <p className="mb-2 text-xs text-muted">{w.equipment}</p>
                      <Stats workout={w} iconClass="text-accent" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/workouts/${w.id}`}
                      className="rounded-full border border-line px-5 py-2 text-xs font-medium hover:border-accent"
                    >
                      View Details
                    </Link>

                    {tab === "plan" && (
                      <button
                        onClick={() => markDone(w)}
                        disabled={isDone}
                        className="flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-xs font-semibold text-black disabled:cursor-not-allowed"
                      >
                        <Check size={14} />
                        {isDone ? "Done" : "Mark as Done"}
                      </button>
                    )}

                    <button
                      onClick={() => (tab === "plan" ? removeFromPlan(w) : removeFromSaved(w))}
                      className="p-1 text-muted hover:text-white"
                      title="Remove"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Metric({ label, value, accent, border }) {
  return (
    <div className={`px-5 py-6 sm:px-8 ${border ? "border-l border-line" : ""}`}>
      <p className="text-xs text-muted sm:text-sm">{label}</p>
      <p
        className={`mt-2 font-display text-4xl font-bold sm:text-5xl ${
          accent ? "text-accent" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
