const categories = ["all", "clothing", "shoes", "accessories"];

export default function CategoryFilter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-48 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
    >
      {categories.map((c) => (
        <option key={c} value={c}>
          {c === "all" ? "همه دسته‌ها" : c}
        </option>
      ))}
    </select>
  );
}
