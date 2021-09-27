const express = require("express");
require("dotenv").config({path: './lib/config/.env'});

const app = express();

//Init db
require("./db/");

//Init express
require("./express")(app);
