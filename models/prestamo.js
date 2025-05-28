'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prestamo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  Prestamo.belongsTo(models.Usuarios, {
    foreignKey: 'usuarioId',
    as: 'usuario'
  });

  Prestamo.belongsTo(models.Libros, {
    foreignKey: 'libroId',
    as: 'libro'
  });
}
  }
  Prestamo.init({
    fechaPrestamo: DataTypes.DATE,
    fechaDevolucion: DataTypes.DATE,
    estado: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER,
    libroId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prestamo',
  });
  return Prestamo;
};