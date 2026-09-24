export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.abcz.workers.dev/api/fitlog";

// helper: return the first key that has a value
function pick(obj, keys, fallback) {
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      return obj[key];
    }
  }
  return fallback;
}

// find a value by key name pattern, also looks inside nested objects (e.g. stats: { caloriesBurned: 180 })
function findByPattern(obj, pattern) {
  for (const key of Object.keys(obj)) {
    if (pattern.test(key) && obj[key] !== null && typeof obj[key] !== "object") {
      return obj[key];
    }
  }
  for (const key of Object.keys(obj)) {
    const inner = obj[key];
    if (inner && typeof inner === "object" && !Array.isArray(inner)) {
      const found = findByPattern(inner, pattern);
      if (found !== undefined) return found;
    }
  }
  return undefined;
}

// "25 min" -> 25
export function toNumber(value) {
  const n = parseFloat(String(value).replace(/[^\d.]/g, ""));
  return isNaN(n) ? 0 : n;
}

function toList(value) {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (!value) return [];
  return String(value)
    .split(/[,\n]/)
    .map((v) => v.trim())
    .filter(Boolean);
}

// Makes every workout look the same, even if the API uses slightly different field names
export function normalizeWorkout(raw) {
  const equipment = pick(raw, ["equipment", "equipments"], "");
  const instructions = pick(raw, ["instructions", "steps", "howTo"], []);

  return {
    id: String(pick(raw, ["id", "_id", "slug"], "")),
    name: pick(raw, ["name", "title", "workout"], "Workout"),
    image: pick(raw, ["image", "imageUrl", "img", "thumbnail", "photo", "picture"], ""),
    categories: toList(pick(raw, ["categories", "category", "tags", "muscles", "muscleGroups"], [])),
    equipment: Array.isArray(equipment) ? equipment.join(", ") : String(equipment),
    duration: toNumber(pick(raw, ["duration", "durationMin", "minutes", "time"], 0)),
    calories: toNumber(
      pick(raw, ["calories", "kcal", "calorie"], findByPattern(raw, /cal|kcal|burn/i) ?? 0)
    ),
    rating: toNumber(pick(raw, ["rating", "rate", "stars"], 0)),
    difficulty: String(pick(raw, ["difficulty", "level"], "")),
    sets: String(pick(raw, ["sets"], "")),
    reps: String(pick(raw, ["reps", "repetitions"], "")),
    description: String(pick(raw, ["description", "subtitle", "summary", "about"], "")),
    instructions: Array.isArray(instructions)
      ? instructions.map((s) => String(s))
      : String(instructions).split("\n").filter(Boolean),
  };
}

function findList(json) {
  if (Array.isArray(json)) return json;
  for (const key of ["data", "workouts", "exercises", "fitlog", "items", "results"]) {
    if (Array.isArray(json?.[key])) return json[key];
  }
  const firstArray = Object.values(json || {}).find((v) => Array.isArray(v));
  return firstArray || [];
}

export async function fetchWorkouts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Could not load workouts");
  const json = await res.json();
  return findList(json).map(normalizeWorkout);
}

export async function fetchWorkout(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Workout not found");
  const json = await res.json();
  const raw = json?.data && !Array.isArray(json.data) ? json.data : json;
  const workout = normalizeWorkout(raw);
  if (!workout.id) workout.id = String(id);
  return workout;
}

export function sortWorkouts(list, key) {
  const copy = [...list];
  if (key === "rating") return copy.sort((a, b) => b.rating - a.rating);
  return copy.sort((a, b) => a[key] - b[key]);
}
