export default function Spinner({ text = "Loading workouts…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="spinner"></div>
      <p className="text-sm text-muted">{text}</p>
    </div>
  );
}
