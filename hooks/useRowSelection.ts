import { useState, useMemo, useCallback } from "react";

export function useRowSelection() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleRow = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleAllVisible = useCallback((visibleIds: string[]) => {
    setSelectedIds((prev) => {
      const allVisibleSelected = visibleIds.every((id) => prev.has(id));
      const next = new Set(prev);
      if (allVisibleSelected) {
        visibleIds.forEach((id) => next.delete(id));
      } else {
        visibleIds.forEach((id) => next.add(id));
      }
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const pruneSelection = useCallback((remainingIds: Set<string>) => {
    setSelectedIds((prev) => {
      const next = new Set<string>();
      prev.forEach((id) => {
        if (remainingIds.has(id)) next.add(id);
      });
      return next;
    });
  }, []);

  const getSelectAllState = useCallback(
    (visibleIds: string[]): "all" | "some" | "none" => {
      if (visibleIds.length === 0) return "none";
      const selectedCount = visibleIds.filter((id) =>
        selectedIds.has(id),
      ).length;
      if (selectedCount === 0) return "none";
      if (selectedCount === visibleIds.length) return "all";
      return "some";
    },
    [selectedIds],
  );

  return {
    selectedIds,
    toggleRow,
    toggleAllVisible,
    clearSelection,
    pruneSelection,
    getSelectAllState,
  };
}
