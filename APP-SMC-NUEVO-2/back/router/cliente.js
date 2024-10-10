const express = require("express");
const ControaldorCliente = require("../controllers/ControladroCliente");
const upload = require("../helpers/Subirimagen");
const ClienteRouter = express.Router();
const Personas = require("../models/Persona");  // Asegúrate de que el modelo Persona esté importado
const Empresa = require("../models/Empresa");  // Asegúrate de que el modelo Empresa esté importado

// Ruta para crear un cliente (ya existente)
ClienteRouter.post(
  "/clientecrear",
  upload.single("ImageCupon"),
  ControaldorCliente.crear
);

// Ruta para obtener todas las decisiones (empresas y personas)
ClienteRouter.get("/getallDecisison", async (req, res) => {
  try {
    const personas = await Personas.findAll(); // Obtener todas las personas
    const empresas = await Empresa.findAll();  // Obtener todas las empresas
    
    const resultado = [
      ...personas.map(persona => ({
        id_cliente: persona.id,
        nombre_cliente: persona.nombre,
        apellido_cliente: persona.apellido,
        tipo_cliente: 'persona'
      })),
      ...empresas.map(empresa => ({
        id_cliente: empresa.id,
        nombre_cliente: empresa.nombre,
        tipo_cliente: 'empresa'
      }))
    ];

    res.status(200).json(resultado); // Enviar las personas y empresas combinadas
  } catch (error) {
    console.error("Error obteniendo datos:", error);
    res.status(500).json({ message: "Error obteniendo datos", error: error.message });
  }
});

// Ruta para obtener un cliente por ID (ya existente)
ClienteRouter.get("/Single/:id", ControaldorCliente.details);

// ===================== NUEVAS RUTAS ===================== //

// Ruta para registrar una persona
ClienteRouter.post("/personas", async (req, res) => {
  try {
    const { nombre, apellido, dni, telefono, direccion } = req.body;
    
    const nuevaPersona = await Personas.create({
      nombre,
      apellido,
      dni,
      telefono,
      direccion,
    });

    // Solo enviar el mensaje de éxito sin los datos adicionales
    res.status(201).json({ message: "Persona registrada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar persona", error: error.message });
  }
});

// Ruta para registrar una empresa
ClienteRouter.post('/empresas', async (req, res) => {
  try {
    const { nombre, ruc, telefono, direccion } = req.body;
    const nuevaEmpresa = await Empresa.create({
      nombre,
      ruc,
      telefono,
      direccion,
    });

    // Solo enviar el mensaje de éxito sin los datos adicionales
    res.status(201).json({ message: "Empresa registrada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar empresa", error: error.message });
  }
});

module.exports = ClienteRouter;
