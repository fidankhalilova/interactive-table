interface Props {
  page: number;
  pageSize: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function Pagination({
  page,
  pageSize,
  totalRows,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const currentPage = Math.min(page, totalPages - 1);

  const startRow = totalRows === 0 ? 0 : currentPage * pageSize + 1;
  const endRow = Math.min(totalRows, (currentPage + 1) * pageSize);

  return (
    <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <span>
          {totalRows === 0 ? "0 rows" : `${startRow}–${endRow} of ${totalRows}`}
        </span>
        <label className="flex items-center gap-1 ml-2">
          <span className="text-xs text-gray-500">Rows per page</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border rounded px-1 py-0.5 text-sm"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(0)}
          disabled={currentPage === 0}
          className="px-2 py-1 rounded border disabled:opacity-40"
        >
          « First
        </button>
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-2 py-1 rounded border disabled:opacity-40"
        >
          ‹ Prev
        </button>
        <span className="px-2 text-xs">
          Page {totalRows === 0 ? 0 : currentPage + 1} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className="px-2 py-1 rounded border disabled:opacity-40"
        >
          Next ›
        </button>
        <button
          type="button"
          onClick={() => onPageChange(totalPages - 1)}
          disabled={currentPage >= totalPages - 1}
          className="px-2 py-1 rounded border disabled:opacity-40"
        >
          Last »
        </button>
      </div>
    </div>
  );
}
