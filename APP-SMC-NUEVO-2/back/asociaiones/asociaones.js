const cupones = require("../models/Cupones");
const empresa = require("../models/Empresa");
const Personas = require("../models/Persona");
const cliente = require("../models/cliente");

empresa.belongsTo(cliente, {
  foreignKey: "id_empresa",

});

Personas.belongsTo(cliente, {
  foreignKey: "id_cliente",
});  

cliente.hasMany(cupones , {
    foreignKey:"id_cliente"
})
cupones.belongsTo( cliente , {
    foreignKey:"id_cliente"
})





//rlacio_shipempres
//empresa laboral __remae__milagros__santana

// empresa.hasMany(cupones,   {
//     foreignKey:"id_empresa"
// })

// cupones.belongsTo( empresa , {
//     foreignKey:"id_empresa"
// })

// Personas.hasMany(cupones , {foreignKey:"id_persona"} )
// cupones.belongsTo(Personas ,  {foreignKey:"id_persona"})
