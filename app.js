const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/views/client'));

const urlshorten = require('./routes/urlShortener');
app.use('/', urlshorten);

require('./startup/db')();

const PORT = process.env.PORT || 80;
app.listen((PORT), () => console.log(`Listening on Port ${PORT}...`));
