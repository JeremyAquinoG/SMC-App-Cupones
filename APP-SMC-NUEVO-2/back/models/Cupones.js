const db = require("../coneccion/db");
const { DataTypes } = require("sequelize");

const cupones = db.define("cupones", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  totalCupones: {
    type: DataTypes.INTEGER,
  },
  ImageCupon: {
    type: DataTypes.STRING,
  },
  clienteId: { // Solo mantén esta columna
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = cupones;
