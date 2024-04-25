const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./app/routers/router');

const app = express();

app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));