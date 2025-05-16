const axios = require("axios")

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
})

const error = (error) => {
  error.response
    ? console.log(`Error ${error.status}: ${error.response.data.error.message}`)
    : console.log(`Error ${error.message}`)
}

async function login() {
  try {
    const response = await api.post("/usuarios/login", {
      usuario: "usuario",
      password: "userpass"
    })
    api.defaults.headers.common["Authorization"] = "Bearer " + response.data.token
    console.log(response.data.message)
  } catch (err) {
    error(err)
  }
}

async function getPerfil() {
  try {
    const response = await api.get("/usuarios/perfil")
    console.log(response.data)
  } catch (err) {
    error(err)
  }
}

async function run() {
  await login()
  await getPerfil()
}

run()
