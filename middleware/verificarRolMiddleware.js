const { CustomError } = require("../utils/errorHandler");

const verificarRol = (rolRequerido) => {
  return (req, res, next) => {
    const usuario = req.user;
    
    if (!usuario || usuario.rol !== rolRequerido) {
      return next(new CustomError("Acceso denegado: Rol insuficiente", 403));
    }
    next();
  };
};

module.exports = { verificarRol };
