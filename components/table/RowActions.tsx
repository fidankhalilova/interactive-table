interface Props {
  rowName: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function RowActions({ rowName, onEdit, onDelete }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onEdit}
        aria-label={`Edit row for ${rowName}`}
        className="text-xs text-gray-500 hover:text-gray-800"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={onDelete}
        aria-label={`Delete row for ${rowName}`}
        className="text-xs text-gray-500 hover:text-red-600"
      >
        Delete
      </button>
    </div>
  );
}
