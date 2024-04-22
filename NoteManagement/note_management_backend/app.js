const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Connection = require("./database/db");
const Router = require("./Routes/router");

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.use(Router);

const port = 8000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
