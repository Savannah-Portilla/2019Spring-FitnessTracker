const express = require('express');
const Exercize = require('../models/Exercize');

const app = express.Router();

app.get("/", async (req, res, next) => {
    Exercize.getAll()
    .then(x=> res.send(x) )
    .catch(next)

}),
app.get("/getAll", (req, res) => {

    uExercize.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.get("/getExercize", (req, res) => {   //unique to each table

    Exercize.getExercize(req.params, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/addExercize", (req, res) => {   //unique to each table

    console.log(req.body);
    Exercize.addExercize(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/updateExercize", (req, res) => {   //unique to each table

    console.log(req.body);
    Exercize.updateExercize(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/deleteExercize", (req, res) => {   //unique to each table

    console.log(req.body);
    Exercize.deleteExercize(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});

module.exports = app;