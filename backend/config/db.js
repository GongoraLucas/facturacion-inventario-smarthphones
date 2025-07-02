const mongoose = require("mongoose");


const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.URI_MONGODB);
        console.log("Éxito: conexión exitosa con Mongo DB Atlas");
    }catch(error){
        console.log("Error: No se pudo conectar con Mongo DB Atlas: "+error);
        process.exit(1);
    }
} 

module.exports = connectDB;