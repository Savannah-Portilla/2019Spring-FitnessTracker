const express = require('express');
const User = require('../models/User'); // name of corresponding file in models

const app = express.Router();

// ID, f_name, l_name, password, weight, weight_goal, email, created_at

app.get("/:email", (req, res) => {   // get via email

    User.get(req.params.email, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/addUser", (req, res) => {   

    console.log(req.body);
    User.addUser(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});    
app.post("/loginUser", (req, res) => {   

    console.log(req.body);
    User.loginUser(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/updateUser", (req, res) => {   

    console.log(req.body);
    User.updateUser(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});

module.exports = app;
