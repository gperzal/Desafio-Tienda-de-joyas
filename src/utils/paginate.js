/**
 * Paginates an array of items based on the provided page number and page size.
 * @param {Array} items - The items to paginate.
 * @param {number} currentPage - The current page number.
 * @param {number} pageSize - The number of items per page.
 * @returns {Array} - A subset of items representing the requested page.
 */
export const paginate = (items, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
};
