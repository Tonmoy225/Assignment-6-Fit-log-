#!/bin/bash
# Makes 12 meaningful git commits using YOUR git name/email.
# Run once from the project folder:  bash commit-steps.sh
set -e
[ -d .git ] || git init -b main

c() { git add $1 && git commit -q -m "$2" && echo "committed: $2"; }

c "package.json package-lock.json next.config.mjs jsconfig.json postcss.config.mjs eslint.config.mjs .gitignore .env.example" "initial Next.js project setup with Tailwind CSS"
c "public/images" "added logo and banner assets"
c "app/globals.css" "added theme colors, fonts and loading spinner styles"
c "lib" "added API helper, data normalizer and sort function"
c "context" "added app context for plan, saved, done, toast and localStorage"
c "components/Navbar.js components/Footer.js components/Toast.js app/layout.js" "built navbar with active link, plan/saved badges, footer and toast"
c "components/WorkoutCard.js components/WorkoutImage.js components/Stats.js components/Spinner.js" "added workout card, stats row and spinner components"
c "app/page.js" "built home page hero and library grid with loading state"
c "app/workouts" "built workout details page with add to plan and save buttons"
c "app/my-plan components/SortDropdown.js" "built My Plan page with metrics, tabs, sort, mark as done and remove"
c "app/not-found.js components/NotFoundView.js" "added 404 page and workout not found view"
c "README.md" "added README with description, technologies and features"

# anything left over (safety)
git add -A && git commit -q -m "final cleanup" 2>/dev/null || true
git log --oneline
