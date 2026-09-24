"use client";

import { ArrowDown } from "lucide-react";
import { useApp } from "@/context/AppContext";
import WorkoutCard from "@/components/WorkoutCard";
import Spinner from "@/components/Spinner";

export default function Home() {
  const { workouts, loading, error, loadWorkouts } = useApp();

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      {/* Hero */}
      <section className="mt-10 grid items-center gap-8 rounded-3xl border border-line bg-card p-8 sm:p-14 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            Workout Library
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold uppercase leading-[1.05] sm:text-6xl lg:text-7xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-6 max-w-md text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
            today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase text-black transition hover:brightness-90"
          >
            Browse Workouts
            <ArrowDown size={16} />
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src="/images/banner.png"
            alt="Workout machine illustration"
            className="w-64 sm:w-80 md:w-full md:max-w-sm"
          />
        </div>
      </section>

     

        {loading && <Spinner />}

        {!loading && error && (
          <div className="py-16 text-center">
            <p className="text-muted">{error}</p>
            <button
              onClick={loadWorkouts}
              className="mt-4 rounded-lg bg-accent px-5 py-2 text-sm font-bold text-black"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
