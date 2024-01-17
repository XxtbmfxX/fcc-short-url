const database = require("../db/db")

const dns = require("dns")

const handlePost = async (req, res) => {

    const db = await database.getDB();

    const dato = await db.command({ serverStatus: 1 }).localTime

    res.send({
      ladb: dato,
      ping: "pong"
    })

  // try {

  //   const db = database.getDB();

  //   const { url } = req.body;
  //   const { hostname } = new URL(url);

  //   dns.lookup(hostname, async (err, address) => {

  //     if (!address) {
  //       throw new Error("Invalid Adress")
  //     }

  //     else {

  //       const shortUrl = // encontrar en base al largo de los objetos en la colección 

  //       const urlObj = {
  //         original_url: url,
  //         short_url: shortUrl,
  //       };

  //       const newUrlObject = // agregar a la db 

  //       res.send(urlObj)
  //     }
  //   });
  // }
  // catch (error) {
  //   console.log(error)
  //   res.json({ error: error })
  // }
};

const handleGet = (req, res) => {
  res.send('¡Hola! Esta es una solicitud GET en el endpoint /api/shorturl');
}


// Exporta un objeto que contiene todas las funciones
module.exports = {
  handlePost,
  handleGet,
};