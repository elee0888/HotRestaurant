// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var tables = []


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservation", function (req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
});

// Displays all tables
app.get("/api/tables", function (req, res) {
    var returnObject = tables.slice(0, 5)
    return res.json(returnObject);
});


app.get("/api/waitList", function (req, res) {
    var returnObject = tables.slice(5)
    return res.json(returnObject);
});

app.get("/api/clear",function (req, res) {
    tables = []
    res.sendFile(path.join(__dirname, "tables.html"));
})


// Create New Characters - takes in JSON input
app.post("/api/reservation", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = req.body;

    console.log(newTable);

    tables.push(newTable)

    res.end();
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
