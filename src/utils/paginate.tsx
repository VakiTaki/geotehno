export const paginate = <T,>(
  data: T[],
  first: number,
  itemsPerPage: number
): T[] => {
  const endIndex = first + itemsPerPage;
  return data.slice(first, endIndex);
};
