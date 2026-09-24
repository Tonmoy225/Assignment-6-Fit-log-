import Link from "next/link";

export default function NotFoundView({
  title = "404 — Page not found",
  text = "The page you are looking for does not exist or was moved.",
}) {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-5 py-28 text-center">
      <p className="font-display text-8xl font-bold text-accent">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold uppercase">{title}</h1>
      <p className="mt-3 text-muted">{text}</p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase text-black"
      >
        Back to home
      </Link>
    </section>
  );
}
