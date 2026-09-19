import { ColumnDef, Row } from "./types";

function formatCellForCsv(row: Row, key: ColumnDef["key"]): string {
  if (key === "joinedAt") return new Date(row.joinedAt).toLocaleDateString();
  if (key === "completed") return row.completed ? "Yes" : "No";
  return String(row[key]);
}

function escapeCsvField(value: string): string {
  const needsQuoting = /[",\n\r]/.test(value);
  if (!needsQuoting) return value;
  return `"${value.replace(/"/g, '""')}"`;
}

export function rowsToCsv(rows: Row[], exportColumns: ColumnDef[]): string {
  const header = exportColumns
    .map((col) => escapeCsvField(col.label))
    .join(",");

  const lines = rows.map((row) =>
    exportColumns
      .map((col) => escapeCsvField(formatCellForCsv(row, col.key)))
      .join(","),
  );

  return [header, ...lines].join("\r\n");
}

export function downloadCsv(csvContent: string, filename: string) {
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
