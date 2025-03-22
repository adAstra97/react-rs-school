import { memo, useCallback, useState } from 'react';
import { REGIONS } from '../utils/constants';

interface Props {
  onSelect: (region: string) => void;
}

export const RegionFilter = memo(({ onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const handleSelectRegion = useCallback(
    (region: string) => {
      const selectedRegion = region === 'All regions' ? '' : region;
      setSelectedRegion(selectedRegion);
      onSelect(selectedRegion);
      setIsOpen(!isOpen);
    },
    [isOpen, onSelect]
  );

  return (
    <div className="relative">
      <button
        className="bg-white shadow py-3 px-4 rounded-sm cursor-pointer w-[143px]"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        {selectedRegion ? selectedRegion : 'Filter by Region'}
      </button>
      {isOpen && (
        <ul className="absolute bg-white right-0 left-0 mt-1 shadow select-none">
          {REGIONS.map((region) => (
            <li
              className="px-4 py-1.5 last:pb-3 hover:bg-hover cursor-pointer transition-colors"
              key={region}
              onClick={() => handleSelectRegion(region)}
            >
              {region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

RegionFilter.displayName = 'RegionFilter';
