interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const Search = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Search for a country..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-3 bg-white rounded focus:outline-none focus:ring-0 shadow placeholder:text-grey"
    />
  );
};
