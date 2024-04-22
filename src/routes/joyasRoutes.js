import express from 'express';
import { listJoyas, listJoyasByCategory, findJoya, listJoyasByFields } from '../controllers/joyasController.js';

const router = express.Router();




// Rutas estáticas 
router.get('/search', listJoyasByFields);
router.get('/', listJoyas);

// Rutas parametrizada
router.get('/:id', findJoya);
router.get('/categoria/:categoria', listJoyasByCategory);

export default router;
