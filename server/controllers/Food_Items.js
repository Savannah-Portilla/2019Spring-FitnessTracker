const express = require('express');
const Food_Item = require('../models/Food_Item');

const app = express.Router();

app.get("/", async (req, res, next) => {
    Food_Item.getAll()
    .then(x=> res.send(x) )
    .catch(next)

}),
app.get("/getAll", (req, res) => { 

    Food_Item.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.get("/getFood", (req, res) => {   //unique to each table

    Food_Item.get(req.params, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/addFoodItem", (req, res) => {   //unique to each table

    console.log(req.body);
    Food_Item.addFoodItem(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/updateFoodItem", (req, res) => {   //unique to each table

    console.log(req.body);
    Food_Item.updateFoodItem(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/deleteFoodItem", (req, res) => {   //unique to each table

    console.log(req.body);
    Food_Item.deleteFoodItem(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});

module.exports = app;