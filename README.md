<div align="center">

<img src="public/images/logo.png" alt="FitLog logo" width="56" />

# FitLog — Workout Library

**Train with intent. Log every set.**

A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.

[Live Demo](#) · [GitHub Repo](#)

</div>

---

## About the project

FitLog is a workout library web app. It loads 12 lifts from an API, shows them as cards, opens a full detail page for each lift, and lets you build a daily plan (max 5 lifts) and a saved list on the **My Plan** page.

## Technologies used

| Technology | Purpose |
| --- | --- |
| Next.js (App Router) | UI and page routing |
| React | Components and state (Context API) |
| Tailwind CSS v4 | Styling and responsive design |
| lucide-react | Icons |
| Fitlog REST API | Workout data |
| localStorage | Keeps plan and saved lists after reload |

## Key features

1. **Workout library** — 12 workouts from the API in a responsive 3-column grid with a loading spinner.
2. **Workout details page** — big image, key specs table and 4-step instructions.
3. **Today's plan and Saved list** — add from the details page, navbar badges update live, toast on every action.
4. **My Plan dashboard** — live Exercises / Minutes / Calories summary, tabs, and a Sort By dropdown (Duration, Calories, Rating).
5. **Mark as Done and Remove** — finish or remove a lift with a toast message.
6. **Plan cap and persistence** — plan is limited to 5 lifts and everything is saved in localStorage.
7. **Fully responsive** with a custom 404 page.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home (hero + library) |
| `/workouts/[id]` | Workout details |
| `/my-plan` | My Plan (Today's Plan / Saved) |
| any other route | 404 page |

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Folder structure

```
app/           pages (home, workouts/[id], my-plan, not-found)
components/    Navbar, Footer, WorkoutCard, Toast, Spinner ...
context/       AppContext (plan, saved, done, toast)
lib/           API helpers
public/images  logo and banner
```
