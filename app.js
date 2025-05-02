const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Alke Biblioteca')
})

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`)
})
