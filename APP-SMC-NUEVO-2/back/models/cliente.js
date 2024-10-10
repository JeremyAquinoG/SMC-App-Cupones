const db = require("../coneccion/db");
const  DataTypes  = require("sequelize")


const cliente =  db.define("cliente" , {
            id_cliente:{
                type: DataTypes.INTEGER     , 
                allowNull:false  , 
                primaryKey : true  ,
                autoIncrement:true

            }           , 
            nombre_cliente:  { 
                 type:DataTypes.STRING
            } , 
            tipo_cliente:  {
                  type:DataTypes.ENUM("empresa","persona")
            }
              

} , {

    timestamps:false
})

module.exports  =  cliente