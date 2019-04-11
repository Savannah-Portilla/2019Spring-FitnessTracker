const express = require('express');
const Routine = require('../models/Routine');

const app = express.Router();

app.get("/", async (req, res, next) => {
    Routine.getAll()
    .then(x=> res.send(x) )
    .catch(next)

}),
app.get("/getAll", (req, res) => {

    Routine.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.get("/getRoutine", (req, res) => {   //unique to each table

    Routine.getRoutine(req.params, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/addRoutine", (req, res) => {   //unique to each table

    console.log(req.body);
    Routine.addRoutine(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/addExercizeToRoutine", (req, res) => {   //unique to each table

    console.log(req.body);
    Routine.addExercizeToRoutine(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/deleteExersizeFromRoutine", (req, res) => {   //unique to each table

    console.log(req.body);
    Routine.deleteExercizesFromRoutine(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/updateRoutine", (req, res) => {   //unique to each table

    console.log(req.body);
    Routine.updateRoutine(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/deleteRoutine", (req, res) => {   //unique to each table

    console.log(req.body);
    Routine.deleteRoutine(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});

module.exports = app; 