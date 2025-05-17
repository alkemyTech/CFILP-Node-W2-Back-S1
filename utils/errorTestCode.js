function verificarRespuestaCreado(response, statusCodeEsperado, campo) {
  expect(response.status).toBe(statusCodeEsperado);
  expect(response.body).toHaveProperty(campo);
}

function verificarStatusError(response, statusEsperado, campo = "errors") {
  expect(response.status).toBe(statusEsperado);
  expect(response.body).toHaveProperty(campo);
  expect(response.body[campo].length).toBeGreaterThan(0);
}

function verificarStatusDuplicado(response, statusEsperado, campo) {
  expect(response.status).toBe(statusEsperado);
  expect(response.body).toHaveProperty("error");
  expect(response.body.error).toHaveProperty("message");
  expect(response.body.error.message).toBe(`El ${campo} ya está en uso`);
}



module.exports = { verificarRespuestaCreado, verificarStatusError, verificarStatusDuplicado };
