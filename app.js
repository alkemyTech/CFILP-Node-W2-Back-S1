const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const librosRoutes = require('./routes/librosRoutes')
const usuariosRoutes = require('./routes/usuariosRoutes')

// Middleware JSON para parsear los datos enviados por el cliente (body)
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Alke Biblioteca')
})

app.use('/libros', librosRoutes)

app.use('/usuarios', usuariosRoutes)

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`)
})
