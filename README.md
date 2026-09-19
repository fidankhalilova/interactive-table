# Interactive Table

A sortable, filterable data table built with Next.js, TypeScript, and
Tailwind CSS. No table libraries — sorting, filtering, pagination,
selection, and CSV export are all written by hand on top of a single
`useMemo` derivation chain.

## Features

- Click-to-sort columns (ascending → descending → none), with a real
  `<button>` inside each sortable `<th>` and `aria-sort` set correctly —
  keyboard and screen-reader accessible, not just a clickable header glyph
- Real-time keyword filter, debounced so typing doesn't recompute the
  derived list on every keystroke
- Pagination, computed strictly after filtering and sorting (never before —
  filtering first is what prevents "empty page" bugs when a filter narrows
  the result set)
- Row selection with bulk actions (Delete, Mark Complete); selection is
  keyed by row id in a `Set`, so it survives filtering, sorting, and page
  changes instead of silently dropping
- Per-row inline edit and delete, each action labelled with the specific
  row's name (`aria-label="Edit row for Olivia García"`), not a bare "Edit"
  repeated identically across every row
- Column show/hide toggle — hiding a column removes it from header, body,
  and CSV export alike; at least one column must always stay visible
- CSV export via an in-browser `Blob`, respecting the current filter, sort
  order, and visible columns (and spanning all matching rows, not just the
  current page)
- Sticky table header on scroll
- Distinct empty states for "no data at all" vs "no rows match your filter"

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.
