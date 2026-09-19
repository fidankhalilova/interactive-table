import { ColumnDef } from "./types";

export const columns: ColumnDef[] = [
  { key: "name", label: "Name", sortable: true, defaultVisible: true },
  { key: "email", label: "Email", sortable: true, defaultVisible: true },
  { key: "role", label: "Role", sortable: true, defaultVisible: true },
  { key: "status", label: "Status", sortable: true, defaultVisible: true },
  { key: "joinedAt", label: "Joined", sortable: true, defaultVisible: true },
  {
    key: "completed",
    label: "Completed",
    sortable: true,
    defaultVisible: true,
  },
];
