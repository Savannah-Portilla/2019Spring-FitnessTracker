const express = require('express');
const User = require('../models/User'); //name of corresponding file in models

const app = express.Router();

app.get("/", (req, res) => {  

    User.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.get("/:id", (req, res) => {   

    User.get(req.params.id, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/", (req, res) => {   

    console.log(req.body);
    User.add(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});


module.exports = app;
