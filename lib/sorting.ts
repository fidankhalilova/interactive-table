import { Row, ColumnKey, SortDirection } from "./types";

type SortValue = string | number | boolean | null | undefined;

function getSortValue(row: Row, key: ColumnKey): SortValue {
  if (key === "joinedAt") return new Date(row.joinedAt).getTime();
  return row[key];
}

function compareValues(a: SortValue, b: SortValue): number {
  const aEmpty = a === null || a === undefined;
  const bEmpty = b === null || b === undefined;

  if (aEmpty && bEmpty) return 0;
  if (aEmpty) return 1;
  if (bEmpty) return -1;

  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b, undefined, { sensitivity: "base" });
  }

  if (typeof a === "boolean" && typeof b === "boolean") {
    return a === b ? 0 : a ? 1 : -1; 
  }

  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  return 0;
}

export function sortRows(
  rows: Row[],
  key: ColumnKey | null,
  direction: SortDirection,
): Row[] {
  if (!key || direction === "none") {
    return [...rows];
  }

  const copy = [...rows];

  copy.sort((rowA, rowB) => {
    const result = compareValues(
      getSortValue(rowA, key),
      getSortValue(rowB, key),
    );
    return direction === "ascending" ? result : -result;
  });

  return copy;
}

export function nextSortState(
  currentKey: ColumnKey | null,
  currentDirection: SortDirection,
  clickedKey: ColumnKey,
): { key: ColumnKey | null; direction: SortDirection } {
  if (currentKey !== clickedKey) {
    return { key: clickedKey, direction: "ascending" };
  }

  if (currentDirection === "ascending")
    return { key: clickedKey, direction: "descending" };
  if (currentDirection === "descending")
    return { key: null, direction: "none" };
  return { key: clickedKey, direction: "ascending" };
}
