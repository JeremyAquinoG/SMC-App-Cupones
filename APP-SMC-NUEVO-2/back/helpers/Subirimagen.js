const multer = require("multer")

const  storage =  multer.diskStorage({

   destination:  ( req, file , cb)=>{
    
                cb(null,  "public")
   },
   filename : ( req , file ,cb ) =>{


     const  { originalname }     = file 
     let caracter = ( originalname.split("."))[1]
     console.log(caracter)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix +`.${caracter}`);
   }
})


const  upload =  multer({storage})
module.exports =  upload

