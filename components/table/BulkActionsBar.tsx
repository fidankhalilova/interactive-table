interface Props {
  selectedCount: number;
  onDelete: () => void;
  onMarkComplete: () => void;
  onClearSelection: () => void;
}

export default function BulkActionsBar({
  selectedCount,
  onDelete,
  onMarkComplete,
  onClearSelection,
}: Props) {
  if (selectedCount === 0) return null;

  return (
    <div
      role="status"
      className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded px-3 py-2 text-sm"
    >
      <span className="text-blue-800 font-medium">
        {selectedCount} row{selectedCount === 1 ? "" : "s"} selected
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onMarkComplete}
          className="text-xs px-2 py-1 rounded border border-blue-300 bg-white hover:bg-blue-100"
        >
          Mark Complete
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="text-xs px-2 py-1 rounded border border-red-300 text-red-700 bg-white hover:bg-red-50"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={onClearSelection}
          className="text-xs px-2 py-1 text-gray-500 hover:text-gray-700"
        >
          Clear selection
        </button>
      </div>
    </div>
  );
}
