"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchWorkouts } from "@/lib/api";

const AppContext = createContext(null);

export const PLAN_LIMIT = 5;

export function AppProvider({ children }) {
  // workouts from the API
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // plan / saved / done store only workout ids
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  const [toast, setToast] = useState(null);

  function loadWorkouts() {
    setLoading(true);
    setError("");
    fetchWorkouts()
      .then((data) => setWorkouts(data))
      .catch(() => setError("Could not load workouts. Please try again."))
      .finally(() => setLoading(false));
  }

  // fetch data once
  useEffect(() => {
    fetchWorkouts()
      .then((data) => setWorkouts(data))
      .catch(() => setError("Could not load workouts. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  // read localStorage once
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      setPlan(JSON.parse(localStorage.getItem("fitlog-plan")) || []);
      setSaved(JSON.parse(localStorage.getItem("fitlog-saved")) || []);
      setDone(JSON.parse(localStorage.getItem("fitlog-done")) || []);
    } catch (e) {
      // ignore broken storage
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // save to localStorage on every change
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    localStorage.setItem("fitlog-done", JSON.stringify(done));
  }, [plan, saved, done, hydrated]);

  // toast auto hides after 2.5s
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  function showToast(message, type = "success") {
    setToast({ message, type, key: Date.now() });
  }

  function addToPlan(workout) {
    if (plan.includes(workout.id)) {
      showToast("Already in today's plan", "info");
      return;
    }
    if (plan.length >= PLAN_LIMIT) {
      showToast("Plan is full — cap of five lifts", "error");
      return;
    }
    setPlan([...plan, workout.id]);
    showToast(`${workout.name} added to today's plan`);
  }

  function saveForLater(workout) {
    if (saved.includes(workout.id)) {
      showToast("Already saved", "info");
      return;
    }
    setSaved([...saved, workout.id]);
    showToast(`${workout.name} saved for later`);
  }

  function removeFromPlan(workout) {
    setPlan(plan.filter((id) => id !== workout.id));
    setDone(done.filter((id) => id !== workout.id));
    showToast(`${workout.name} removed from today's plan`, "info");
  }

  function removeFromSaved(workout) {
    setSaved(saved.filter((id) => id !== workout.id));
    showToast(`${workout.name} removed from saved`, "info");
  }

  function markDone(workout) {
    if (done.includes(workout.id)) return;
    setDone([...done, workout.id]);
    showToast(`${workout.name} marked as done`);
  }

  const value = {
    workouts,
    loading,
    error,
    loadWorkouts,
    plan,
    saved,
    done,
    hydrated,
    toast,
    addToPlan,
    saveForLater,
    removeFromPlan,
    removeFromSaved,
    markDone,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
