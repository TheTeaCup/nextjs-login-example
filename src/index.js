require("dotenv").config();
const database = require("./redis");

console.log("starting...")

database.on("connect", async function () {
    console.log(
        "( Database ) Successfully connected to Redis database."
    );
});

database.on("error", function (err) {
    console.log(
        " ( Database ) Connection Failed to Redis database."
    );
    console.log("( Database ) Error: ", err);
});

const Login = require("./routes/login");

const express = require("express");
var bodyParser = require('body-parser');
const cors = require('cors');

var app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

// routes
app.use("/login", Login);


// assume 404 since no middleware responded
app.use(function (req, res) {
    res.status(404).json({
        error: true,
        status: 404,
        message: "Endpoint not found"
    });
});


app.listen(port, () => {
    console.log(
        ` ( API ) listening on ${port}`
    );
});


