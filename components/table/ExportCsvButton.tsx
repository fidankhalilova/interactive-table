import { ColumnDef, Row } from "@/lib/types";
import { rowsToCsv, downloadCsv } from "@/lib/csvExport";

interface Props {
  rows: Row[];
  visibleColumns: ColumnDef[];
  disabled: boolean;
}

export default function ExportCsvButton({
  rows,
  visibleColumns,
  disabled,
}: Props) {
  const handleExport = () => {
    const csv = rowsToCsv(rows, visibleColumns);
    const timestamp = new Date().toISOString().slice(0, 10);
    downloadCsv(csv, `table-export-${timestamp}.csv`);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={disabled}
      className="text-xs px-2 py-1.5 rounded border bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      Export CSV
    </button>
  );
}
