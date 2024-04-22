import { describe, it, expect } from '@jest/globals';
import supertest from 'supertest';
import app from '../server.js';


const request = supertest(app);

describe('API Joyas Tests', () => {
    test('GET /joyas - Debe retornar un status 200 y un array de joyas', async () => {
        const response = await request.get('/joyas');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('GET /joyas - Debe aplicar paginación correctamente', async () => {
        const response = await request.get('/joyas?page=1&pageSize=5');
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(5);
    });

    test('GET /joyas/search - Debe filtrar correctamente por metal y category', async () => {
        const response = await request.get('/joyas/search?metal=oro&category=collar');
        expect(response.status).toBe(200);
        expect(response.body.every(j => j.metal === 'oro' && j.category === 'collar')).toBe(true);
    });

    test('GET /joyas/:id - Debe retornar un mensaje de error si la joya no existe', async () => {
        const response = await request.get('/joyas/9999'); // Suponiendo que 9999 no es un ID válido
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Joya no encontrada');
    });
});
