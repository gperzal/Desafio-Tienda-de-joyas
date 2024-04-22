import { getJoyas, getJoyasByCategory, getJoyaById, getFilteredJoyas } from '../models/joyasModel.js';
import { paginate } from '../utils/paginate.js';
import { sortItems } from '../utils/sort.js';

// export const listJoyas = (req, res) => {
//     let results = getJoyas().map(joya => {
//         return {
//             ...joya,
//             links: [
//                 { rel: "self", method: "GET", href: `${req.protocol}://${req.get('host')}/joyas/${joya.id}` },
//                 { rel: "category", method: "GET", href: `${req.protocol}://${req.get('host')}/joyas/categoria/${joya.category}` }
//             ]
//         };
//     });

//     // Enlaces adicionales a la colección completa y opciones de filtrado
//     const links = {
//         self: { method: "GET", href: `${req.protocol}://${req.get('host')}/joyas` },
//         filterByCategory: { method: "GET", href: `${req.protocol}://${req.get('host')}/joyas?category={category}` },
//         sortByValue: { method: "GET", href: `${req.protocol}://${req.get('host')}/joyas?sort=value_asc` }
//     };

//     res.json({ results, links });
// };



export const listJoyas = (req, res) => {
    // Extraer los parámetros de consulta con valores predeterminados
    const {
        page = 1,
        pageSize = 10,
        sort = 'value',  // Elige el campo predeterminado para ordenar, si es necesario
        order = 'asc'    // Orden predeterminado
    } = req.query;

    // http://localhost:3000/joyas/?page=1&pageSize=10&sort=value&order=asc

    let results = getJoyas();

    // Aplicar ordenamiento si se proporciona el campo sort
    if (sort) {
        results = sortItems(results, sort, order);
    }

    // Aplicar paginación
    results = paginate(results, parseInt(page), parseInt(pageSize));

    // Agregar enlaces HATEOAS
    results = results.map(joya => ({
        ...joya,
        links: [
            { rel: "self", method: "GET", href: `${req.protocol}://${req.get('host')}/joyas/${joya.id}` },
            { rel: "category", method: "GET", href: `${req.protocol}://${req.get('host')}/joyas/categoria/${joya.category}` }
        ]
    }));

    res.json({
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        data: results
    });
};




export const listJoyasByFields = (req, res) => {
    const filters = req.query;
    const results = getFilteredJoyas(filters);

    // Aplicar HATEOAS a los resultados filtrados
    const linkedResults = results.map(joya => ({
        ...joya,
        links: [
            { rel: "self", method: "GET", href: `${req.protocol}://${req.get('host')}/joyas/${joya.id}` },
            { rel: "category", method: "GET", href: `${req.protocol}://${req.get('host')}/joyas/categoria/${joya.category}` }
        ]
    }));

    res.json(linkedResults);
};


export const listJoyasByCategory = (req, res) => {
    const { categoria } = req.params;
    const filteredJoyas = getJoyasByCategory(categoria); // Usa la función del modelo
    if (!filteredJoyas.length) {
        return res.status(200).json([]);
    }
    res.json(filteredJoyas);
};

export const findJoya = (req, res) => {
    const joya = getJoyaById(req.params.id);
    if (!joya) {
        return res.status(404).json({
            error: 'Joya no encontrada',
            message: `No se pudo encontrar la joya con el ID ${req.params.id}`,
            code: 404,
            links: [
                { rel: "all", method: "GET", href: `${req.protocol}://${req.get('host')}/joyas` }
            ]
        });
    }
    res.json(joya);
};
