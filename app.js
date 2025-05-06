const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const librosRoutes = require('./routes/librosRoutes')

// Middleware JSON para parsear el body de la petición
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Alke Biblioteca')
})

app.use('/libros', librosRoutes)

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`)
})
