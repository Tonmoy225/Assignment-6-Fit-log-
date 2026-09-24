"use client";

import { useApp } from "@/context/AppContext";

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  const border =
    toast.type === "error"
      ? "border-red-500"
      : toast.type === "info"
      ? "border-sky-400"
      : "border-accent";

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-4">
      <div
        key={toast.key}
        className={`rounded-xl border-l-4 ${border} bg-[#23262e] px-5 py-3 text-sm font-medium shadow-lg`}
      >
        {toast.message}
      </div>
    </div>
  );
}
