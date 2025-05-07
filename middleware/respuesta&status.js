// 200 OK: La solicitud fue exitosa y el servidor devuelve el recurso solicitado
// 201 Created: Recurso creado exitosamente en el servidor
// 400 Bad Request: La solicitud tiene datos incorrectos o malformados
// 403 Forbidden: El cliente está autenticado pero no tiene permisos para acceder al recurso
// 404 Not Found: El recurso solicitado no existe en el servidor
// 500 Internal Server Error: Error inesperado en el servidor al procesar la solicitud

const succesResponse = (res, data, elemento) => {
  return res.status(200).json({
    mesaje: `El ${elemento} fue encontrado`,
    data,
  });
};

const createdResponse = (res, data, elemento) => {
  return res.status(201).json({
    mesaje: `El ${elemento} fue creado`,
    data,
  });
};

const badRequestResponse = (res, error, elemento, customMessage) => {
  return res.status(400).json({
    mensaje: customMessage || `El ${elemento} no fue creado`,
    error: error.message || error,
    detalles: error.errors ? error.errors.map((err) => err.message) : [],
    campo: elemento,
  });
};

const forbiddenResponse = (res, error, elemento) => {
  return res.status(403).json({
    mensaje: `El ${elemento} no fue creado`,
    error,
    campo: elemento,
  });
};

const notFoundResponse = (res, error, elemento) => {
  return res.status(404).json({
    mensaje: `El ${elemento} no fue encontrado`,
    error: error.message || error,
    campo: elemento,
  });
};

const internalServerErrorResponse = (res, error, elemento) => {
  return res.status(500).json({
    mensaje: `El ${elemento} no fue creado`,
    error: error.message || error,
    detalles: error.errors ? error.errors.map((err) => err.message) : [],
    campo: elemento,
  });
};

module.exports = {
  succesResponse,
  createdResponse,
  badRequestResponse,
  forbiddenResponse,
  notFoundResponse,
  internalServerErrorResponse,
};
