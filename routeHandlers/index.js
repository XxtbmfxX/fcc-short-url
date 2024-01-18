
const db = require("../db/dbFunctions")

const dns = require("dns")

const handlePost = async (req, res) => {
  try {
    const { url } = req.body;
    const { hostname } = new URL(url);

    console.log(hostname)

    dns.lookup(hostname, async (err, address) => {

      if (!address) {
        throw new Error("Invalid Adress")
      }

      else {
        const urlEnDb = await db.agregarURL(url)

        if (urlEnDb) {
          console.log(db.getURLS)
          res.send(urlEnDb)
        } else {


          const shortUrl = await db.getUrlCount()
          const urlObj = {
            original_url: url,
            short_url: shortUrl,
          };

          const newUrlObject = db.agregarURL(urlObj)

          res.send(newUrlObject)
        }
      }

    });
  }
  catch (error) {
    console.log(error)
    res.json({ error: error })
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