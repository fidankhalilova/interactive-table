import { columns } from "@/lib/columns";
import { ColumnKey } from "@/lib/types";

interface Props {
  visibleKeys: Set<ColumnKey>;
  onToggle: (key: ColumnKey) => void;
}

export default function ColumnToggle({ visibleKeys, onToggle }: Props) {
  return (
    <div className="flex items-center gap-3 flex-wrap text-sm">
      <span className="text-xs font-medium text-gray-500">Columns</span>
      {columns.map((col) => {
        const isVisible = visibleKeys.has(col.key);
        const isLastVisible = isVisible && visibleKeys.size === 1;

        return (
          <label
            key={col.key}
            className={`flex items-center gap-1 ${isLastVisible ? "opacity-50" : ""}`}
            title={
              isLastVisible
                ? "At least one column must stay visible"
                : undefined
            }
          >
            <input
              type="checkbox"
              checked={isVisible}
              disabled={isLastVisible}
              onChange={() => onToggle(col.key)}
              className="w-3.5 h-3.5"
            />
            {col.label}
          </label>
        );
      })}
    </div>
  );
}
