'use client';

import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearSelectedCharacters } from '../../redux/slices/selectedCharactersSlice';
import { downloadCsvFile, generateCsvContent } from '../../utils/csv-export';

export const Flyout = () => {
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector(
    (state) => state.selectedCharacters
  );
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const handleUnselectAll = () => {
    dispatch(clearSelectedCharacters());
  };

  const handleDownloadCharacters = () => {
    const csvContent = generateCsvContent(selectedCharacters);
    const fileName = `${selectedCharacters.length}_characters.csv`;
    downloadCsvFile(csvContent, fileName, downloadLinkRef.current);
  };

  return (
    <div
      className={`
      fixed bottom-6 left-5 rounded-xl z-[150]
      border-button border-2 py-3 px-4 bg-flyoutBackground
      transition-all duration-300 ease-in-out
      ${
        selectedCharacters.length > 0
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }
    `}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="text-contrast">
          <span className="text-[18px] font-semibold mr-1 font-mono">
            {selectedCharacters.length}
          </span>
          item
          {selectedCharacters.length > 1 ? 's' : ''} are selected
        </span>
        <div className="flex flex-row gap-4">
          <button type="button" onClick={handleUnselectAll}>
            Unselect all
          </button>
          <button type="button" onClick={handleDownloadCharacters}>
            Download
          </button>
        </div>
      </div>
      <a ref={downloadLinkRef} className="hidden" aria-hidden="true" />
    </div>
  );
};
