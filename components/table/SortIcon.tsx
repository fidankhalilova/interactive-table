import { SortDirection } from "@/lib/types";

interface Props {
  direction: SortDirection;
}

export default function SortIcon({ direction }: Props) {
  if (direction === "none") {
    return (
      <span className="text-gray-500 text-xs" aria-hidden="true">
        ↕
      </span>
    );
  }
  return (
    <span className="text-gray-700 text-xs" aria-hidden="true">
      {direction === "ascending" ? "↑" : "↓"}
    </span>
  );
}
