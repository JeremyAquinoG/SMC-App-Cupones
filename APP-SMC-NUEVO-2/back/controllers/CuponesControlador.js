const db = require("../coneccion/db");
const cupones = require("../models/Cupones");
const empresa = require("../models/Empresa");
const cliente = require("../models/cliente"); // Asegúrate de tener este modelo importado
const controladorCupones = {};

// Crear o actualizar cupones
controladorCupones.crear = async (req, res) => {
  const { totalCupones, entityId } = req.body; // Se añade entityId para asociar con la entidad
  const im = req.file ? req.file.path : null; // Evitar error si no hay imagen

  try {
    // Verifica si el cliente ya tiene cupones
    let existingCupon = await cupones.findOne({
      where: { clienteId: entityId },
    });

    if (existingCupon) {
      // Si ya tiene cupones, suma los nuevos cupones al total
      let updatedTotal = existingCupon.totalCupones + totalCupones;
      await existingCupon.update({
        totalCupones: updatedTotal,
        ImageCupon: im || existingCupon.ImageCupon, // Mantiene la imagen si no se proporciona una nueva
      });

      return res.send({
        msg: "Cupones actualizados correctamente.",
        totalCupones: updatedTotal,
      });
    } else {
      // Si no tiene cupones, crea un nuevo registro
      let newCoupon = await cupones.create({
        totalCupones,
        ImageCupon: im,
        clienteId: entityId,
      });

      return res.send({
        msg: "Se agregó el cupón correctamente.",
        totalCupones,
      });
    }
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).send({ error: error.message });
  }
};

// Obtener cupones de una entidad específica (por su ID)
controladorCupones.obtenerCuponesPorEntidad = async (req, res) => {
  const { entityId } = req.params;
  try {
    let coupons = await cupones.findOne({
      where: { clienteId: entityId },
    });
    return res.send(coupons || { totalCupones: 0 });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Obtener todas las empresas y personas
controladorCupones.getall = async (req, res) => {
  try {
    let primero = await empresa.findAll(); // Devuelve todas las empresas
    return res.send(primero);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Método de navegación (lo mantengo sin cambios)
controladorCupones.navegar = async (req, res) => {
  let datos = await db.query("SELECT * FROM empresa");
  console.log(datos);
};

module.exports = controladorCupones;
