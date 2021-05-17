const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
require('./config/db');

//! parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//! parse application/json
app.use(bodyParser.json());

const indexRoute = require('./routes/indexRoutes')
app.use("/api/", indexRoute)


app.listen(port, () => console.log("Invertory app listening on " + port + " port!"))

module.exports = app;