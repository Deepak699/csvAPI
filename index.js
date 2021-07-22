//Requiring Modules
require('dotenv').config()
const express = require('express')
const csvRouter = require('./routes/csv')
require("./db/db");
const app = express();
//Serving up HTML file
app.use(express.static('public'))

//PORT declare
const port = process.env.PORT || 3000

//using csv Route
app.use(csvRouter)


//Server Port to listen
app.listen(port, () => {
  console.log("Running");
});
