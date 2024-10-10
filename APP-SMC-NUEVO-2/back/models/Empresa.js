const db = require("../coneccion/db");
const { DataTypes } = require("sequelize");

const Empresa = db.define("empresa", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false, // Aseguramos que el nombre no sea nulo
  },
  ruc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true, // Opcional, si quieres permitir que la dirección sea nula
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false, // Agregamos teléfono si es requerido
  }
}, {
  timestamps: false, // No necesitamos marcas de tiempo
});

module.exports = Empresa;
