import { Row } from "./types";

const FIRST_NAMES = [
  "Olivia",
  "Liam",
  "Emma",
  "Noah",
  "Ava",
  "Elijah",
  "Sophia",
  "Lucas",
  "Isabella",
  "Mason",
  "Mia",
  "Ethan",
  "Amelia",
  "Logan",
  "Harper",
  "James",
  "Evelyn",
  "Benjamin",
  "Abigail",
  "Jacob",
];

const LAST_NAMES = [
  "García",
  "Müller",
  "Smith",
  "Nguyen",
  "Dubois",
  "Kovač",
  "O'Brien",
  "Andersson",
  "Rossi",
  "Kowalski",
  "Silva",
  "Fernández",
  "Novák",
  "Larsen",
  "Tanaka",
];

const ROLES = [
  "Engineer",
  "Designer",
  "Product Manager",
  "Support",
  "Sales",
  "QA",
];
const STATUSES: Row["status"][] = ["active", "invited", "suspended"];

// Simple deterministic PRNG (mulberry32) so the generated set is stable
// across renders/reloads rather than re-randomizing on every mount, which
// would make manual testing of sort/filter behavior confusing.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

export function generateRows(count = 50, seed = 42): Row[] {
  const rand = mulberry32(seed);
  const rows: Row[] = [];

  for (let i = 0; i < count; i++) {
    const first = pick(FIRST_NAMES, rand);
    const last = pick(LAST_NAMES, rand);
    const role = pick(ROLES, rand);
    const status = pick(STATUSES, rand);

    const daysAgo = Math.floor(rand() * 700);
    const joined = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    rows.push({
      id: `row-${i}`,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase().replace(/[^a-z]/g, "")}@example.com`,
      role,
      status,
      joinedAt: joined.toISOString(),
      completed: rand() > 0.6,
    });
  }

  return rows;
}
