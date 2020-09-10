require("dotenv").config({});
require("./src/database/index");
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const routes = require("./src/routes");

const app = express();

app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
app.use(routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.warn(`SERVER IS RUNNING IN PORT: ${PORT}`));
