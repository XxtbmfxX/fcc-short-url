require('dotenv').config();



const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const routeHandlers = require('./routeHandlers/index')


const db = require("./db/db")


db.conectarBaseDeDatos()


// Basic Configuration
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json())



app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});



// Endpoint para la solicitud GET en '/api/shorturl'
app.get('/api/shorturl/:shorturl', routeHandlers.handleGet );

// Endpoint para la solicitud POST en '/api/shorturl'
app.post('/api/shorturl', routeHandlers.handlePost)


app.listen(port, function() {
  console.log(`Listening on port http://localhost:${port}`);
});
