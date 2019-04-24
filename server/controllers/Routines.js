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
app.post("/getID", async (req, res, next) => {
    user.getId(req.body)
    .then(x => res.send(x))
    .catch(next)
})
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
app.post("/addExerciseToRoutine", (req, res) => {   //unique to each table

    console.log(req.body);
    Routine.addExerciseToRoutine(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/deleteExersiseFromRoutine", (req, res) => {   //unique to each table

    console.log(req.body);
    Routine.deleteExercisesFromRoutine(req.body, (err, data) => {
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