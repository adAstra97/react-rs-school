import { memo, useCallback } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const Search = memo(({ value, onChange }: Props) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <input
      type="text"
      placeholder="Search for a country..."
      value={value}
      onChange={handleChange}
      className="px-4 py-3 bg-white rounded focus:outline-none focus:ring-0 shadow placeholder:text-grey"
    />
  );
});

Search.displayName = 'Search';
