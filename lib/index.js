require("dotenv").config({path: './lib/config/.env'});

const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const router = require('./routes/index');

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(3333);