
const db = require("../db/dbFunctions")

const dns = require("dns")



const handlePost = async (req, res) => {
 // Verificar si se proporcionó una URL en el body de la petición
 if (!req.body || !req.body.url) {
  return res.status(400).json({ error: 'invalid url' });
}

const urlString = req.body.url;

try {
  // Intentar crear un objeto URL con la cadena proporcionada
  const urlObj = new URL(urlString);

  //buscar en base de datos , si está debolver en el formato pedido
  db.agregarURL(urlObj).then((db_resp) => {
    res.json(db_resp)
  })

} catch (error) {
  // Si se lanzó una excepción, entonces la URL no es válida
  res.status(400).json({ error: 'invalid url' });
}


};

const handleGet = async (req, res) => {
  const { shorturl } = req.params

  const urlInDB = await db.buscarPorUrl(shorturl)

  if (urlInDB) {

    res.redirect(urlInDB.original_url)
    
  } else {
    res.send({
      error: "No short URL found for the given input"
    })
  }

}


// Exporta un objeto que contiene todas las funciones
module.exports = {
  handlePost,
  handleGet,
};