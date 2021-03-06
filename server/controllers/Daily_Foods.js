const express = require('express');
const Daily_Food = require('../models/Daily_Food');

const app = express.Router();

app.get("/", async (req, res, next) => {
    Daily_Food.getAll()
    .then(x=> res.send(x) )
    .catch(next)

}),
app.get("/getAll", (req, res) => {

    Daily_Food.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.get("/getDailyFoods", (req, res, next) => {   //unique to each table

    Daily_Food.getDailyFoods()
    .then(x=> res.send(x) )
    .catch(next)

}),

app.post("/getID", async (req, res, next) => {
    Daily_Food.getId(req.params.id)
    .then(x => res.send(x))
    .catch(next)
})
app.post("/add", (req, res, next) => {   //unique to each table

    console.log(req.body);
    Daily_Food.add(req.body, req.user.ID)
    .then(x => res.send(x))
    .catch(next)

});
app.post("/updateDailyFoods", (req, res) => {   //unique to each table

    console.log(req.body);
    Daily_Food.updateDailyFoods(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/deleteDailyFoods", (req, res) => {   //unique to each table

    console.log(req.body);
    Daily_Food.deleteDailyFoods(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.get("/getTotalCalories", (req, res) => {   //unique to each table

    console.log(req.body);
    Daily_Food.getTotalCalories(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/addFoodItems", (req, res) => {   //unique to each table

    console.log(req.body);
    Daily_Food.addFoodItems(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/deleteFoodItems", (req, res) => {   //unique to each table

    console.log(req.body);
    Daily_Food.deleteFoodItems(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});

module.exports = app;