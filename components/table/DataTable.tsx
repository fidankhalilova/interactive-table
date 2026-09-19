"use client";

import { useState, useMemo, useEffect } from "react";
import { generateRows } from "@/lib/generateRows";
import { columns } from "@/lib/columns";
import { sortRows, nextSortState } from "@/lib/sorting";
import { filterRows } from "@/lib/filtering";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useRowSelection } from "@/hooks/useRowSelection";
import { ColumnKey, SortState, Filters, Row } from "@/lib/types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import FilterInput from "./FilterInput";
import Pagination from "./Pagination";
import BulkActionsBar from "./BulkActionsBar";
import ColumnToggle from "./ColumnToggle";
import ExportCsvButton from "./ExportCsvButton";

export default function DataTable() {
  const [rows, setRows] = useState(() => generateRows(50));
  const [sortState, setSortState] = useState<SortState>({
    key: null,
    direction: "none",
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [visibleColumnKeys, setVisibleColumnKeys] = useState<Set<ColumnKey>>(
    () => new Set(columns.filter((c) => c.defaultVisible).map((c) => c.key)),
  );

  const {
    selectedIds,
    toggleRow,
    toggleAllVisible,
    clearSelection,
    pruneSelection,
    getSelectAllState,
  } = useRowSelection();

  const debouncedKeyword = useDebouncedValue(keywordInput, 250);
  const filters: Filters = { keyword: debouncedKeyword };

  useEffect(() => {
    setPage(0);
  }, [debouncedKeyword, pageSize]);

  const handleSort = (key: ColumnKey) => {
    const next = nextSortState(sortState.key, sortState.direction, key);
    setSortState(next);
  };

  const toggleColumn = (key: ColumnKey) => {
    setVisibleColumnKeys((prev) => {
      if (prev.has(key) && prev.size === 1) return prev;
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

    if (
      sortState.key === key &&
      visibleColumnKeys.has(key) &&
      visibleColumnKeys.size > 1
    ) {
      setSortState({ key: null, direction: "none" });
    }
  };

  const visibleColumns = useMemo(
    () => columns.filter((c) => visibleColumnKeys.has(c.key)),
    [visibleColumnKeys],
  );

  const sortedFilteredRows = useMemo(() => {
    const filtered = filterRows(rows, filters);
    const sorted = sortRows(filtered, sortState.key, sortState.direction);
    return sorted;
  }, [rows, filters.keyword, sortState.key, sortState.direction]);

  const pageRows = useMemo(() => {
    const start = page * pageSize;
    return sortedFilteredRows.slice(start, start + pageSize);
  }, [sortedFilteredRows, page, pageSize]);

  const visibleIdsOnPage = useMemo(() => pageRows.map((r) => r.id), [pageRows]);
  const selectAllState = getSelectAllState(visibleIdsOnPage);

  const handleBulkDelete = () => {
    const remaining = rows.filter((row) => !selectedIds.has(row.id));
    const remainingIds = new Set(remaining.map((r) => r.id));
    setRows(remaining);
    pruneSelection(remainingIds);
    if (editingId && !remainingIds.has(editingId)) setEditingId(null);
  };

  const handleBulkMarkComplete = () => {
    setRows((prev) =>
      prev.map((row) =>
        selectedIds.has(row.id) ? { ...row, completed: true } : row,
      ),
    );
  };

  const handleSingleDelete = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
    const remainingIds = new Set(
      rows.filter((r) => r.id !== id).map((r) => r.id),
    );
    pruneSelection(remainingIds);
    if (editingId === id) setEditingId(null);
  };

  const handleSaveEdit = (
    id: string,
    changes: Pick<Row, "name" | "email" | "role" | "status">,
  ) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...changes } : row)),
    );
    setEditingId(null);
  };

  const isFiltered = filters.keyword.trim() !== "";

  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <FilterInput value={keywordInput} onChange={setKeywordInput} />
        <div className="flex items-center gap-3 flex-wrap">
          <ColumnToggle
            visibleKeys={visibleColumnKeys}
            onToggle={toggleColumn}
          />
          <ExportCsvButton
            rows={sortedFilteredRows}
            visibleColumns={visibleColumns}
            disabled={sortedFilteredRows.length === 0}
          />
        </div>
      </div>
      <BulkActionsBar
        selectedCount={selectedIds.size}
        onDelete={handleBulkDelete}
        onMarkComplete={handleBulkMarkComplete}
        onClearSelection={clearSelection}
      />
      <div className="border rounded overflow-auto max-h-[70vh]">
        <table className="w-full border-collapse min-w-150">
          <TableHeader
            visibleColumns={visibleColumns}
            sortState={sortState}
            onSort={handleSort}
            selectAllState={selectAllState}
            onToggleAll={() => toggleAllVisible(visibleIdsOnPage)}
          />
          <TableBody
            rows={pageRows}
            visibleColumns={visibleColumns}
            hasAnyData={rows.length > 0}
            isFiltered={isFiltered}
            selectedIds={selectedIds}
            editingId={editingId}
            onToggleSelect={toggleRow}
            onStartEdit={setEditingId}
            onCancelEdit={() => setEditingId(null)}
            onSaveEdit={handleSaveEdit}
            onDeleteRow={handleSingleDelete}
          />
        </table>
      </div>
      <Pagination
        page={page}
        pageSize={pageSize}
        totalRows={sortedFilteredRows.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}
