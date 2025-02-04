import { FC } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex flex-row overflow-x-auto gap-4 justify-center">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center border rounded
            ${
              currentPage === page
                ? 'bg-amber-500 border-amber-500 !text-teal-950'
                : 'border-gray-300 hover:border-amber-500'
            }`}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
