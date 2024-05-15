export const generatePaginationNumber = (
  currentPage: number,
  totalPages: number
) => {
  //si el numero de paginas es 7 o menos, mostrar todos los numeros
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  //si el numero de paginas es mayor a 7 y esta en las 3 primeras, mostrar solo los primeros 3 y los ultimos 2
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }
  //si el numero de paginas es mayor a 7 y esta en las 3 ultimas, mostrar solo los primeros 2 y los ultimos 3
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  //si la pagina actual es la mitad de las paginas, mostrar solo los primeros 3 y los ultimos 3
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages
  ]
};
