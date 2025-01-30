import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-6 flex justify-center">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`mx-1 rounded px-4 py-2 font-bold ${currentPage === index + 1 ? "text-primary bg-primary-tint1" : "bg-neutral-gray-1 text-neutral-gray-5"}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
