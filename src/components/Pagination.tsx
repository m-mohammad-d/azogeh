import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;
  let pages: (number | string)[] = [];

  if (totalPages <= maxVisiblePages) {
    pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  } else {
    pages = [1];
    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }
    pages.push(totalPages);
  }

  return (
    <div className="mt-6 flex justify-center">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`mx-1 rounded px-4 py-2 font-bold ${
            currentPage === page ? "bg-primary-tint1 text-primary" : "bg-neutral-gray-1 text-neutral-gray-5"
          } ${typeof page === "string" ? "cursor-default" : ""}`}
          disabled={typeof page === "string"}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
