import { ColumnDef, Row } from "@/lib/types";
import TableRow from "./TableRow";

interface Props {
  rows: Row[];
  visibleColumns: ColumnDef[];
  hasAnyData: boolean;
  isFiltered: boolean;
  selectedIds: Set<string>;
  editingId: string | null;
  onToggleSelect: (id: string) => void;
  onStartEdit: (id: string) => void;
  onCancelEdit: () => void;
  onSaveEdit: (
    id: string,
    changes: Pick<Row, "name" | "email" | "role" | "status">,
  ) => void;
  onDeleteRow: (id: string) => void;
}

export default function TableBody({
  rows,
  visibleColumns,
  hasAnyData,
  isFiltered,
  selectedIds,
  editingId,
  onToggleSelect,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDeleteRow,
}: Props) {
  if (rows.length === 0) {
    const message = !hasAnyData
      ? "No data."
      : isFiltered
        ? "No rows match your filter."
        : "No data.";

    return (
      <tbody>
        <tr>
          {/* +2: checkbox column + actions column, on top of whichever data columns are visible */}
          <td
            colSpan={visibleColumns.length + 2}
            className="text-center text-sm text-gray-400 py-8"
          >
            {message}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          row={row}
          visibleColumns={visibleColumns}
          isSelected={selectedIds.has(row.id)}
          isEditing={editingId === row.id}
          onToggleSelect={() => onToggleSelect(row.id)}
          onStartEdit={() => onStartEdit(row.id)}
          onCancelEdit={onCancelEdit}
          onSaveEdit={(changes) => onSaveEdit(row.id, changes)}
          onDelete={() => onDeleteRow(row.id)}
        />
      ))}
    </tbody>
  );
}
