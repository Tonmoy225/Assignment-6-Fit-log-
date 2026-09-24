import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 sm:flex-row sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="FitLog logo" className="h-5 w-5" />
          <span className="font-display text-sm font-semibold uppercase tracking-wide">
            FitLog
          </span>
        </Link>
        <p className="text-center text-xs text-muted sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
