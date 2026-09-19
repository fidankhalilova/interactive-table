import { Row, Filters } from "./types";

const SEARCHABLE_FIELDS: (keyof Row)[] = ["name", "email", "role", "status"];

export function matchesKeyword(row: Row, keyword: string): boolean {
  const query = keyword.trim().toLowerCase();
  if (!query) return true;

  return SEARCHABLE_FIELDS.some((field) => {
    const value = row[field];
    return typeof value === "string" && value.toLowerCase().includes(query);
  });
}

export function filterRows(rows: Row[], filters: Filters): Row[] {
  if (!filters.keyword.trim()) return [...rows];
  return rows.filter((row) => matchesKeyword(row, filters.keyword));
}
