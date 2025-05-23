function obtenerSoloFecha() {
   const ahora = new Date();
   return ahora.toISOString().split('T')[0];
}

module.exports = obtenerSoloFecha 