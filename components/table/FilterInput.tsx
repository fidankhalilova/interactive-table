interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function FilterInput({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="table-filter"
        className="text-xs font-medium text-gray-500"
      >
        Filter
      </label>
      <input
        id="table-filter"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search name, email, role, status…"
        className="border rounded px-3 py-1.5 text-sm w-64"
      />
    </div>
  );
}
