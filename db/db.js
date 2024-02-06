
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI


const conectarBaseDeDatos = async () => {
    try {

        await mongoose.connect(uri)
        console.log("Conexión a la base de datos establecida");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error.message);
        throw error;
    }
};

const cerrarConexion = () => {
    mongoose.connection.close();
    console.log("Conexión a la base de datos cerrada");
};

module.exports = { conectarBaseDeDatos, cerrarConexion };