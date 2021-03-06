const mongoose = require("mongoose");

const uri = process.env.DB_URI;

mongoose.connect(uri, {});

const connection = mongoose.connection;

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function () {
  console.log(`DB connection established`);
});
