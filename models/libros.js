'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Libros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Libros.init({
    isbn: DataTypes.STRING,
    titulo: DataTypes.STRING,
    categorias: DataTypes.STRING,
    autor: DataTypes.STRING,
    anio: DataTypes.INTEGER,
    disponibilidad: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Libros',
  });
  return Libros;
};