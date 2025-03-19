import { useState } from 'react';
import { SortType } from '../utils/types';
import { SORT_OPTIONS } from '../utils/constants';

interface Props {
  onSort: (sort: SortType) => void;
}

export const Sort = ({ onSort }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortType>('name-asc');

  const handleSortChange = (sort: SortType) => {
    setSelectedSort(sort);
    onSort(sort);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="bg-white shadow py-3 px-4 rounded-sm cursor-pointer w-[220px] text-left"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {SORT_OPTIONS.find((option) => option.value === selectedSort)?.label ||
          'Sort by'}
      </button>
      {isOpen && (
        <ul className="absolute bg-white right-0 left-0 mt-1 shadow select-none">
          {SORT_OPTIONS.map(({ label, value }) => (
            <li
              key={value}
              className="px-4 py-1.5 hover:bg-hover cursor-pointer transition-colors"
              onClick={() => handleSortChange(value)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
