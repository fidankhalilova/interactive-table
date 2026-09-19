import { ColumnDef, ColumnKey, SortState } from "@/lib/types";
import SortIcon from "./SortIcon";
import Checkbox from "@/components/ui/Checkbox";

interface Props {
  visibleColumns: ColumnDef[];
  sortState: SortState;
  onSort: (key: ColumnKey) => void;
  selectAllState: "all" | "some" | "none";
  onToggleAll: () => void;
}

export default function TableHeader({
  visibleColumns,
  sortState,
  onSort,
  selectAllState,
  onToggleAll,
}: Props) {
  return (
    <thead className="sticky top-0 z-10">
      <tr className="border-b bg-gray-50">
        <th className="px-3 py-2 bg-gray-50">
          <Checkbox
            checked={selectAllState === "all"}
            indeterminate={selectAllState === "some"}
            onChange={onToggleAll}
            ariaLabel="Select all rows on this page"
          />
        </th>
        {visibleColumns.map((col) => {
          const isActive = sortState.key === col.key;
          const ariaSortValue = isActive ? sortState.direction : "none";

          if (!col.sortable) {
            return (
              <th
                key={col.key}
                className="text-left text-xs font-medium text-gray-500 px-3 py-2 bg-gray-50"
              >
                {col.label}
              </th>
            );
          }

          return (
            <th
              key={col.key}
              aria-sort={ariaSortValue}
              className="text-left text-xs font-medium text-gray-500 px-0 py-0 bg-gray-50"
            >
              <button
                type="button"
                onClick={() => onSort(col.key)}
                className="w-full h-full flex items-center gap-1 px-3 py-2 text-left hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {col.label}
                <SortIcon direction={ariaSortValue} />
              </button>
            </th>
          );
        })}
        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 bg-gray-50">
          Actions
        </th>
      </tr>
    </thead>
  );
}
