/**
 * Sorts an array of items by a specified key in ascending or descending order.
 * @param {Array} items - The items to sort.
 * @param {string} key - The key to sort by.
 * @param {string} order - The order of sorting ('asc' for ascending, 'desc' for descending).
 * @returns {Array} - The sorted array.
 */
export const sortItems = (items, key, order = 'asc') => {
    return items.sort((a, b) => {
        if (a[key] < b[key]) {
            return order === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });
};
