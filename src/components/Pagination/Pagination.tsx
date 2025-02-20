interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePrevPage = () => onPageChange(currentPage - 1);
  const handleNextPage = () => onPageChange(currentPage + 1);

  return (
    <div className="flex flex-row gap-4 justify-center text-center items-center">
      <button disabled={currentPage === 1} onClick={handlePrevPage}>
        ◄ Prev
      </button>
      <span className="text-primary w-20">
        {currentPage} of {totalPages}
      </span>
      <button disabled={currentPage === totalPages} onClick={handleNextPage}>
        Next ►
      </button>
    </div>
  );
};
