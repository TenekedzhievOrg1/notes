import { useState } from "react";
import { Todo } from "./types";

const ITEMS_PER_PAGE = 5;

export const usePagination = (todos: Todo[]) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const changePageHandler = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return { currentPage, startIndex, endIndex, totalPages, changePageHandler };
};
