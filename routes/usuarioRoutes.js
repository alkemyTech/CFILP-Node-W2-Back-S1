const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const usuarioRoutes = express.Router();
const validarCampos = require('../middleware/validarCampos'); // Importa el middleware para validar campos

// Verifica que los métodos del controlador están correctamente definidos.
usuarioRoutes.post('/',validarCampos, UsuarioController.creaUsuario);  // Crear un nuevo usuario

module.exports = usuarioRoutes;