 const GetallPersonasUnionCupones = `
		select  distinct  *  from clientes inner  join  cupones     
					on  cupones.id_cliente =  
				clientes.id_cliente inner join personas on personas.id_cliente =  clientes.id_cliente`;



				
const getallEmpresaUnionCupones = `

select  distinct  *  from clientes inner  join  cupones     
					on  cupones.id_cliente =  
				clientes.id_cliente inner join emrpresas on empresas.id_empresa =  clientes.id_cliente`;



// const Obtenefuncion   = () =>{
// 	`
// 	   select  distinct  *  from clientes inner  join  cupones     
// 					on  cupones.id_cliente =  
// 				clientes.id_cliente inner join empresas on empresas.id_empresa =  clientes.id_cliente`;
// }





module.exports = {
  GetallPersonasUnionCupones,
  getallEmpresaUnionCupones,
//   Obtenefuncion,
};