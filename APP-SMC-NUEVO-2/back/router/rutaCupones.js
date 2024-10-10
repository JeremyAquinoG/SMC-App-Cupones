// const express  = require("express" )
// const upload = require("../helpers/Subirimagen")
// const controladorCupones = require("../controllers/CuponesControlador")
// const RouterCupones  = express.Router()  


// RouterCupones.post("/imagencupon",  upload.single("ImagenCupon") ,  controladorCupones.crear);
// RouterCupones.get("/getallemoresas" ,  controladorCupones.getall)
// RouterCupones.get("/actualizar", controladorCupones.navegar);

// module.exports  = RouterCupones
const express = require("express");
const upload = require("../helpers/Subirimagen");
const controladorCupones = require("../controllers/CuponesControlador");
const RouterCupones = express.Router();

// Ruta para subir imagen del cupón y asociarlo a una entidad
RouterCupones.post("/imagencupon", upload.single("ImagenCupon"), controladorCupones.crear);

// Ruta para obtener todas las empresas/personas (entidades)
RouterCupones.get("/getallemoresas", controladorCupones.getall);

// Ruta para navegar (mantener si lo necesitas)
RouterCupones.get("/actualizar", controladorCupones.navegar);

// Ruta para guardar cupones para una entidad (persona o empresa)
RouterCupones.post("/guardar", controladorCupones.crear);

// Ruta para obtener cupones de una entidad específica (persona/empresa)
RouterCupones.get("/:entityId", controladorCupones.obtenerCuponesPorEntidad);

module.exports = RouterCupones;
