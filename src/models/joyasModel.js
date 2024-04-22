import joyas from '../data/joyas.js';

export const getJoyas = () => joyas;

export const getJoyasByCategory = (category) => joyas.filter(joya => joya.category === category);

export const getJoyaById = (id) => joyas.find(joya => joya.id === parseInt(id));

// export const getFilteredJoyas = (filters) => {
//     let filteredResults = joyas;
//     Object.keys(filters).forEach(key => {
//         filteredResults = filteredResults.filter(joya => {
//             return joya[key] && joya[key].toString().toLowerCase() === filters[key].toString().toLowerCase();
//         });
//     });
//     return filteredResults;
// };

export const getFilteredJoyas = (filters) => {
    return joyas.filter(joya => {
        for (let key in filters) {
            let filterValue = filters[key];
            if (!joya[key]) {
                return false; // Si la clave no existe en el objeto joya, excluye esta joya
            }
            if (filterValue.includes('-')) {
                // Supone un rango, solo aplica a valores numéricos
                let [min, max] = filterValue.split('-').map(Number);
                if (joya[key] < min || joya[key] > max) return false;
            } else if (isNaN(filterValue)) {
                // Trata como texto
                if (joya[key].toString().toLowerCase() !== filterValue.toLowerCase()) return false;
            } else {
                // Trata como número
                if (Number(joya[key]) !== Number(filterValue)) return false;
            }
        }
        return true; // Incluye la joya si pasa todos los filtros
    });
};
