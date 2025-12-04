import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  // Logic to show pages: Always show first, last, and pages around current
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);
  
  if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
  }
  if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      
      {startPage > 1 && (
        <>
            <button 
                onClick={() => onPageChange(1)} 
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors text-sm font-medium
                    ${currentPage === 1 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
                1
            </button>
            {startPage > 2 && <span className="text-slate-400 px-1">...</span>}
        </>
      )}

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors text-sm font-medium
            ${currentPage === page
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
            {endPage < totalPages - 1 && <span className="text-slate-400 px-1">...</span>}
            <button 
                onClick={() => onPageChange(totalPages)} 
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors text-sm font-medium
                    ${currentPage === totalPages 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
                {totalPages}
            </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;