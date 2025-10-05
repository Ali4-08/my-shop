export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="جستجو..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
    />
  );
}
