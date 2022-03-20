const cors = require("cors");
const express = require("express");
const router = require('./routes/index');
var cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000;

function configExpress(app) {
    var corsOptions = {
        'origin': 'http://localhost:3000',
        'credentials': true
    }

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(cookieParser());

    app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    });

    app.use(express.json());
    app.use(router);
}

module.exports = configExpress;
