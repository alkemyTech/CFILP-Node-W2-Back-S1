const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const librosRoutes = require('./routes/librosRoutes')
const usuariosRoutes = require('./routes/usuariosRoutes')
const prestamoRoutes = require('./routes/prestamoRoutes')

const errorMiddleware = require('./middleware/errorMiddleware')

// Middleware JSON para parsear los datos enviados por el cliente (body)
app.use(express.json())

const swaggerUI = require('swagger-ui-express')
const swaggerdocumentation = require('./swagger.json')

app.use('/documentacion', swaggerUI.serve, swaggerUI.setup(swaggerdocumentation))

app.get('/', (req, res) => {
  res.send('Alke Biblioteca')
})

app.use('/libros', librosRoutes)

app.use('/usuarios', usuariosRoutes)

app.use('/prestamos', prestamoRoutes)

// Middleware de errores debe ir al final para recibir todos los errores
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`)
})
