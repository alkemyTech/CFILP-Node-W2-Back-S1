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
  Libros.hasMany(models.Prestamo, {
    foreignKey: 'libroId',
    as: 'prestamos'
  });
}
  }
  Libros.init({
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categorias: {
      type: DataTypes.STRING,
      allowNull: false
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    disponibilidad: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Libros',
    indexes: [
      { fields: ['isbn'], unique: true, name: 'idx_libros_isbn' },
      { fields: ['titulo'], name: 'idx_libros_titulo' },
      { fields: ['autor'], name: 'idx_libros_autor' },
      { fields: ['categorias'], name: 'idx_libros_categorias' },
      { fields: ['disponibilidad'], name: 'idx_libros_disponibilidad' }
    ]
  });
  return Libros;
};