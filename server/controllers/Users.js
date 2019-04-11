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
app.post("/addUser", (req, res) => {   

    console.log(req.body);
    User.addUser(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});    
app.post("/loginUser", (req, res) => {   

    //console.log(req.body);
    User.loginUser(req.body.email, req.body.password)
        .then(x=> releaseEvents.send(x) )
        .catch(next)
});
app.post("/changePassword", (req, res, next) => {
    user.changePassword(req.body.email, req.body.oldPassword, req.body.newPassword)
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
