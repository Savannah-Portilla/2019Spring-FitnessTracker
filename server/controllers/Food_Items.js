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
app.post("/getID", async (req, res, next) => {
    user.getId(req.params.id)
    .then(x => res.send(x))
    .catch(next)
})
app.get("/getFood", (req, res) => {   //unique to each table

    Food_Item.get(req.params, (err, data) => {
        if(err) throw err;
        res.send(data);
    });

});
app.post("/addFood", (req, res, next) => {   //unique to each table

    console.log(req.body);
    Food_Item.addFood(req.body, req.user.ID)
    .then(x => res.send(x))
    .catch(next)

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