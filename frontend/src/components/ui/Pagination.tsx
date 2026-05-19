import React from "react";
import "./pagination.css";

interface PaginationProps {
  page: number;
  limit: number;
  totalPages: number;
}

export function Pagination({ page, limit, totalPages }: PaginationProps) {

  const handlePaginate = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    const newOffset = (newPage - 1) * limit;

    params.set('page', newPage.toString());

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);

    window.dispatchEvent(new Event('filtros-actualizados'));
  };

  return (
    <nav className="pagination-container" aria-label="Navegación de páginas">
      <button
        className="btn-pagination"
        onClick={() => handlePaginate(page - 1)}
        disabled={page <= 1}
      >
        Anterior
      </button>

      <span className="pagination-info">
        Página {page} de {totalPages}
      </span>

      <button
        className="btn-pagination"
        onClick={() => handlePaginate(page + 1)}
        disabled={page >= totalPages}
      >
        Siguiente
      </button>
    </nav>
  );
}