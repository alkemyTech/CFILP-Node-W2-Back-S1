const express = require('express');
const app = express();

const usuariosRoutes = require('./routes/usuariosRoutes');
const librosRoutes = require('./routes/librosRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/usuarios', usuariosRoutes);
app.use('/libros', librosRoutes);

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('Alke Biblioteca');
});

// Middleware para manejo de errores (al final)
app.use(errorMiddleware);

module.exports = app;
