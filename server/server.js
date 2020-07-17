var { runServer } = require("./utils/graphql");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var dotenv = require("dotenv");
var express = require("express");

var app = express();
app.use(cookieParser());

dotenv.config();

app.use(cors());

app.get("/canary", (req, res) => res.send("Hello world"));

app.use("/", runServer);

const port = 80;

app.listen(port);

console.log(`Running on: http://localhost:80`);
