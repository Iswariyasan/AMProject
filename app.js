const express = require("express");
const cors = require("cors");
var route = require('./src/route/route');

const app = express();
var corsOptions = {
    origin: "http://localhost:3000"
  };
  
  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(express.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  
  // set port, listen for requests
  const PORT = process.env.PORT || 3000;
  route.route(app);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });