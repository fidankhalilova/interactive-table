import { useState } from "react";
import { ColumnDef, Row } from "@/lib/types";
import Checkbox from "@/components/ui/Checkbox";
import RowActions from "./RowActions";

interface Props {
  row: Row;
  visibleColumns: ColumnDef[];
  isSelected: boolean;
  isEditing: boolean;
  onToggleSelect: () => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: (
    changes: Pick<Row, "name" | "email" | "role" | "status">,
  ) => void;
  onDelete: () => void;
}

const STATUS_OPTIONS: Row["status"][] = ["active", "invited", "suspended"];

function formatValue(row: Row, key: keyof Row): string {
  if (key === "joinedAt") {
    return new Date(row.joinedAt).toLocaleDateString();
  }
  if (key === "completed") {
    return row.completed ? "Yes" : "No";
  }
  return String(row[key]);
}

export default function TableRow({
  row,
  visibleColumns,
  isSelected,
  isEditing,
  onToggleSelect,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}: Props) {
  const [name, setName] = useState(row.name);
  const [email, setEmail] = useState(row.email);
  const [role, setRole] = useState(row.role);
  const [status, setStatus] = useState<Row["status"]>(row.status);

  const startEdit = () => {
    setName(row.name);
    setEmail(row.email);
    setRole(row.role);
    setStatus(row.status);
    onStartEdit();
  };

  const save = () => {
    if (!name.trim() || !email.trim()) return;
    onSaveEdit({
      name: name.trim(),
      email: email.trim(),
      role: role.trim(),
      status,
    });
  };

  const renderEditCell = (col: ColumnDef) => {
    switch (col.key) {
      case "name":
        return (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label={`Name for ${row.name}`}
            className="border rounded px-2 py-1 text-sm w-full"
          />
        );
      case "email":
        return (
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label={`Email for ${row.name}`}
            className="border rounded px-2 py-1 text-sm w-full"
          />
        );
      case "role":
        return (
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            aria-label={`Role for ${row.name}`}
            className="border rounded px-2 py-1 text-sm w-full"
          />
        );
      case "status":
        return (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Row["status"])}
            aria-label={`Status for ${row.name}`}
            className="border rounded px-2 py-1 text-sm w-full"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <span className="text-sm text-gray-400">
            {formatValue(row, col.key)}
          </span>
        );
    }
  };

  if (isEditing) {
    return (
      <tr className="border-b bg-yellow-50">
        <td className="px-3 py-2">
          <Checkbox
            checked={isSelected}
            onChange={onToggleSelect}
            ariaLabel={`Select row for ${row.name}`}
          />
        </td>
        {visibleColumns.map((col) => (
          <td key={col.key} className="px-3 py-2">
            {renderEditCell(col)}
          </td>
        ))}
        <td className="px-3 py-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={save}
              aria-label={`Save changes for ${row.name}`}
              className="text-xs bg-black text-white rounded px-2 py-1"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancelEdit}
              aria-label={`Cancel editing ${row.name}`}
              className="text-xs text-gray-500"
            >
              Cancel
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr
      className={`border-b hover:bg-gray-50 ${isSelected ? "bg-blue-50" : ""}`}
    >
      <td className="px-3 py-2">
        <Checkbox
          checked={isSelected}
          onChange={onToggleSelect}
          ariaLabel={`Select row for ${row.name}`}
        />
      </td>
      {visibleColumns.map((col) => (
        <td key={col.key} className="px-3 py-2 text-sm">
          {formatValue(row, col.key)}
        </td>
      ))}
      <td className="px-3 py-2">
        <RowActions rowName={row.name} onEdit={startEdit} onDelete={onDelete} />
      </td>
    </tr>
  );
}
