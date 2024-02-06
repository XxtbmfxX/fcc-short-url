// dbFunctions.js

const URL_MODEL = require("./urlModel");




// Función para buscar un objeto por su URL de búsqueda (ya sea original_url o short_url)
const buscarPorUrl = async (urlBusqueda) => {
  try {
    const resultado = await URL_MODEL.findOne({
      $or: [
        { original_url: urlBusqueda },
        { short_url: urlBusqueda },
      ],
    });

    if (resultado) {
      return resultado
    } else {
      return false
    }
  } catch (error) {
    console.error("Error al buscar en la base de datos:", error);
  }
};


// Función para agregar una nueva URL
const agregarURL = async (originalURL) => {
  try {

    const urlEnDB = await buscarPorUrl(originalURL)

    if (urlEnDB) {
      return {
        original_url: urlEnDB.original_url,
        short_url: urlEnDB.short_url
      }
    }else{


    const totalURLs = await URL_MODEL.countDocuments();


    const nuevaURL = new URL_MODEL({
      original_url: originalURL,
      short_url: totalURLs,
    });

    await nuevaURL.save();
    console.log("URL agregada exitosamente");
    return {
      original_url: originalURL,
      short_url: totalURLs,
    };
  }

  } catch (error) {
    console.error("Error al agregar la URL:", error.message);
    throw error;
  }
};

// Función para obtener todas las URLs
const obtenerTodasLasURLs = async () => {
  try {
    const urls = await URL_MODEL.find();
    return urls;
  } catch (error) {
    console.error("Error al obtener las URLs:", error.message);
    throw error;
  }
};

module.exports = {
  agregarURL,
  obtenerTodasLasURLs,
  buscarPorUrl,
};

