require('dotenv').config();
const routeHandlers = require('./routeHandlers/index')
const database = require("./db/db")

const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

database.connect();


app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});



// Endpoint para la solicitud GET en '/api/shorturl'
app.get('/api/shorturl', routeHandlers.handleGet );

// Endpoint para la solicitud POST en '/api/shorturl'
app.post('/api/shorturl', routeHandlers.handlePost)


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
