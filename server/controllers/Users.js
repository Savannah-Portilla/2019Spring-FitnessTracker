const express = require('express');
const User = require('../models/User'); // name of corresponding file in models

const app = express.Router();

// ID, f_name, l_name, password, weight, weight_goal, email, created_at
app.get("/", async (req, res, next) => {
    User.getAll()
    .then(x=> res.send(x) )
    .catch(next)

}),
app.get("/:email", (req, res) => {   // get via email

    User.get(req.params.email, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
/* 
app.post("/register", (req, res) => {   

    console.log(req.body);
    User.register(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});   */  

app.post("/register", (req, res, next) => {
    User.register(req.body)
    .then(x=>  res.send(x))
    .catch(next)
}); 

app.post("/login", (req, res, next) => {   

    User.login(req.body.email, req.body.password)
        //console.log(req.body)
        .then(x=> res.send(x))
        .catch(next)
});

app.post("/changePassword", (req, res, next) => {
    User.changePassword(req.body.email, req.body.oldPassword, req.body.newPassword)
    .then(x=>  res.send(x) )
    .catch(next)
});
app.post("/updateUser", (req, res) => {   

    console.log(req.body);
    User.updateUser(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });
app.post("/deleteUser", (req, res) => {   

    console.log(req.body);
    User.deleUser(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
});

module.exports = app;
