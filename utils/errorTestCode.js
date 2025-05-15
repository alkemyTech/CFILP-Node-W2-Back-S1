function verificarRespuestaUsuarioCreado(response, statusCodeEsperado) {
  expect(response.status).toBe(statusCodeEsperado);
  expect(response.body).toHaveProperty("usuario");
}


function verificarStatusError(response, statusEsperado, campo = "errors") {
  expect(response.status).toBe(statusEsperado);
  expect(response.body).toHaveProperty(campo);
  expect(response.body[campo].length).toBeGreaterThan(0);
}

module.exports = { verificarRespuestaUsuarioCreado, verificarStatusError };
