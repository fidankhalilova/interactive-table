export interface Row {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited" | "suspended";
  joinedAt: string;
  completed: boolean;
}

export type ColumnKey = keyof Omit<Row, "id">;

export interface ColumnDef {
  key: ColumnKey;
  label: string;
  sortable: boolean;
  defaultVisible: boolean;
}

export type SortDirection = "ascending" | "descending" | "none";

export interface SortState {
  key: ColumnKey | null;
  direction: SortDirection;
}

export interface Filters {
  keyword: string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
}