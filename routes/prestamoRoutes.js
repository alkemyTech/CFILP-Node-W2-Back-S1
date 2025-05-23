const express = require('express');
const PrestamoController = require('../controllers/prestamoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, PrestamoController.getAllPrestamos);
router.post('/', authMiddleware, PrestamoController.solicitarPrestamo);
router.post('/:prestamoId/devolver', authMiddleware, PrestamoController.devolverLibro);

module.exports = router;
