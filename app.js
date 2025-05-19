const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const librosRoutes = require('./routes/librosRoutes')
const usuariosRoutes = require('./routes/usuariosRoutes')

app.use (express.json())

const swaggerUI = require ('swagger-ui-express')
const swaggerdocumentation = require ('./swagger.json')

app.use('/documentacion', swaggerUI.serve, swaggerUI.setup(swaggerdocumentation))

app.get('/', (req, res) => {
  res.send('Alke Biblioteca')
})

app.use('/libros', librosRoutes)

app.use('/usuarios', usuariosRoutes)

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`)
})
