const cors = require("cors");
const express = require("express");
const router = require('./routes/index');

const port = process.env.PORT || 5000;

function configExpress(app) {
    app.use(cors());
    app.use(express.json());

    app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    });

    app.use(express.json());
    app.use(router);
}

module.exports = configExpress;
