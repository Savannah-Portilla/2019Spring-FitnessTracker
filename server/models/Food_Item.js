const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM Fitness_Food_Items");   
    },
    async getID(id) {
        const data = await conn.query("SELECT * FROM Fitness_Food_Items WHERE ID=?", id);
        if(!data) {
            throw Error('Food not added.')
        }
        return data;
    },
    async addFood(input, user_ID){
        const data = await conn.query(
        "INSERT INTO Fitness_Food_Items (portion,date_created,name,calorie_amount,user_ID) VALUES(?)",
        [[input.portion, new Date(), input.name, input.calorie_amount, user_ID]]
    );
    return model.getID(data.insertId);
}, 
    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    },
    async updateFood(email, name){
        const data = await conn.query(
            `Update Fitness_Food_Items F Join Fitness_Users_Food_Items UF On F.ID = UF.FOOD_ITEM_ID 
            Join Fitness_Users U On UF.USER_ID = U.ID 
            Set ?
            WHERE U.VALUE= and E.VALUE=`, email, name);
        if(data.length == 0){
            throw Error('Food Item Not Found')
        }else{
        return { status: "success", message: "Food Item Succesfully Updated" };
        }
    },  
    async deleteFood(email, name){
        const data = await conn.query(
            `DELETE * FROM Fitness_Food_Items F Join Fitness_Users_Food_Items UF On F.ID = UF.FOOD_ITEM_ID 
            Join Fitness_Users U On UF.USER_ID = U.ID
            WHERE U.VALUE= and W.VALUE=`, email, name);
        if(data.length == 0){
            throw Error('Food Item Not Found')
        }else{
        return { status: "success", message: "Food Item Succesfully Deleted" };
        }
    }, 
}; 

module.exports = model;