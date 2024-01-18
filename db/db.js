
const mongoose = require("mongoose");


const conectarBaseDeDatos = async () => {
    try {

        await mongoose.connect(`mongodb+srv://aatn1321:oQTU17OII4WMwb1D@cluster0.p7vsale.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
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