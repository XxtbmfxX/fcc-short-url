
const mongoose = require("mongoose");


const username = encodeURIComponent(process.env["USER_DB"]);
const password = encodeURIComponent(process.env["USER_PASSWORD"]);

const uri = `mongodb+srv://${username}:${password}@cluster0.p7vsale.mongodb.net/?retryWrites=true&w=majority`

const conectarBaseDeDatos = async () => {
    try {


        const username = process.env["USER_DB"]
        const password = process.env["USER_PASSWORD"]

        const uri = `mongodb+srv://${username}:${password}@cluster0.p7vsale.mongodb.net/?retryWrites=true&w=majority`
        await mongoose.connect(uri, {
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