const db = require("../coneccion/db");
const {
  GetallPersonasUnionCupones,
  getallEmpresaUnionCupones,
  BuscarSinlgeasyn,
  Obtenefuncion,
} = require("../db/querydb");
const cliente = require("../models/cliente");
const cupones = require("../models/Cupones");
const empresa = require("../models/Empresa");
const Personas = require("../models/Persona");

const ControaldorCliente = {};

// Crear cliente
ControaldorCliente.crear = async (req, res) => {
  const { nombre_cliente, tipo_cliente, ruc, direccion } = req.body;

  try {
    // Crear el cliente
    let data = await cliente.create({
      nombre_cliente: nombre_cliente,
      tipo_cliente: tipo_cliente,
    });

    // Si es empresa, creamos la empresa
    if (tipo_cliente === "empresa") {
      await empresa.create({
        ruc,
        direccion,
        id_empresa: data.id_cliente, // Asociar empresa con cliente
      });

      // Crear el cupón para la empresa
      await cupones.create({
        totalCupones: 1,
        ImageCupon: "",
        clienteId: data.id_cliente, // Asegúrate de usar el campo correcto (clienteId o id_cliente)
      });

      return res.send({
        msg: "Empresa registrada exitosamente",
      });

    } else {
      // Si es persona, creamos la persona
      await Personas.create({
        direccion,
        RUC: ruc, // Verifica si "RUC" es necesario en personas
        dni: "222", // Suponiendo que este valor es temporal, deberías reemplazarlo por el correcto
        id_cliente: data.id_cliente, // Asociar persona con cliente
      });

      // Crear el cupón para la persona
      await cupones.create({
        totalCupones: 1,
        ImageCupon: "",
        clienteId: data.id_cliente, // Asegúrate de usar el campo correcto
      });

      return res.send({
        msg: "Persona registrada exitosamente",
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

// Obtener todas las personas y empresas con sus cupones
ControaldorCliente.getallDecisison = async (req, res) => {
  try {
    let query = await db.query(GetallPersonasUnionCupones);

    if (query[0].length === 0) {
      return res.send({
        msg: "No se encontraron datos",
        data: "vacio",
      });
    }

    return res.send({
      msg: "Datos obtenidos correctamente",
      data: query[0],
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

// Obtener detalles de un cliente por ID
ControaldorCliente.details = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el cliente con sus cupones
    const filOne = await cliente.findOne({
      where: {
        id_cliente: id,
      },
      include: [
        {
          model: cupones, // Incluye cupones asociados
        },
      ],
    });

    // Buscar datos de la persona (si es una persona)
    const Clinete = await Personas.findOne({
      where: {
        id_cliente: id,
      },
    });

    if (!filOne) {
      return res.send({ msg: "Cliente no encontrado" });
    }

    return res.send({
      cliente: filOne,
      persona: Clinete,
    });
  } catch (error) {
    return res.status(500).send({
      msg: error.message,
    });
  }
};

module.exports = ControaldorCliente;
