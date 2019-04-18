const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM Fitness_Food_Items");   
    },
    async getFood(id){
        const data = await conn.query("SELECT * FROM Fitness_Food_Items WHERE Id=?", id);
        if(!data){
            throw Error("Food Item not found");
        }
        return data[0];
    },
    async addFood(input){
        const data = await conn.query(
            `INSERT INTO Fitness_Food_Items F Join Fitness_Users_Food_Items UF On F.ID = UF.FOOD_ITEM_ID 
            Join Fitness_Users U On UF.USER_ID = U.ID 
            (name,calorie_amount,date_created,date_updated) WHERE U.VALUE=`, email, 
            [[input.name, input.calorie_amount, input.date_created, new Date()]]
        );
        return await model.get(data.insertId);
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

/* const model = {
    getAll(cb){ 
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            } 
            var thisID = conn.query("SELECT FOOD_ITEMS_ID FROM Fitness_Users_Food_Items WHERE USER_ID=?", [[input.userID]], (err, data) => {
                if(err) {
                    cb(err,data);
                      return; 
                }
                conn.query("SELECT * FROM Fitness_Food_Items WHERE ID=?", [[input.thisID]], (err, data) => {
                    cb(err, data);   
                });
            });    
        });
    },
    getFood(id, cb){ 
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            } 
            var thisID = conn.query("SELECT FOOD_ITEMS_ID FROM Fitness_Users_Food_Items WHERE USER_ID=?", [[input.userID]], (err, data) => {
                if(err) {
                  cb(err,data);
                    return; 
                }
                conn.query("SELECT * FROM Fitness_Food_Items WHERE NAME=? AND ID=?", [[input.name, input.thisID]], (err, data) => {
                    cb(err, data[0]);
                });
            });
        });    
      },
    addFoodItem(input, cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            }
                var newadd = conn.query('INSERT ' + Fitness_Food_Items + ' SET ID = ' + mysql.escape(ID) + 
                                ', name = ' + mysql.escape(name) +
                                ', date_created = ' + mysql.escape(new Date()) + 
                                ', portion = ' + mysql.escape(portion) +
                                ', calorie_amount = ' + mysql.escape(calorie_amount) +
                                ' WHERE Fitness_Users_Food_Items_User_ID = ' + [[input.userID]], (err) => {
                    if (err) throw err;
                    //SQL Search
                    conn.query('SELECT ' + newadd + 'FROM ' + Fitness_Food_Items, (err, result) => {
                        if (err) throw err;
                        call_back(result[0]);
                        
                    });
                });
        });
    },
    updateFoodItem(input, cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]],
        (err, data) => {
            if(err) {
                cb(err);
                return;
            }
            if(data.length < 1) {
                cb(Error("email not found"));
            } else {
                var thisID = conn.query("SELECT FOOD_ITEMS_ID FROM Fitness_Users_Food_Items WHERE USER_ID=?", [[input.userID]],
                (err, data) => { 
                    cb(err, data[0]);
                  }); 
            }
        });
        var update = conn.query("SELECT ID FROM Fitness_Food_Items WHERE NAME=? AND ID=?", [[input.name, input.thisID]],
        (err, data) => {
            if(err){
                cb(err);
                return;
            }
            model.get(data.insertId, (err, data)=>{
                cb(err, data);
            });
        });
         var change = conn.query('INSERT ' + Fitness_Food_Items + ' SET ID = ' + mysql.escape(ID) + 
                                ', name = ' + mysql.escape(name) +
                                ', date_create = ' + mysql.escape(new Date()) + 
                                ', portion = ' + mysql.escape(portion) +
                                ', calorie_amount = ' + mysql.escape(calorie_amount) +
                                ' WHERE Fitness_Users_Food_Items_User_ID = ' + [[input.userID]], (err) => {
                    if (err) throw err;
                    //SQL Search
                    conn.query('SELECT ' + change + 'FROM ' + Fitness_Food_Items, (err, result) => {
                        if (err) throw err;
                        call_back(result[0]);
                    });
                });
    },
    //delete a specific workout by email and workout name
    deleteFoodItem(input,cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]],
        (err, data) => {
            if(err) {
                cb(err);
                return;
            }
            if(data.length < 1) {
                cb(Error("email not found"));
            } else {
                var thisID = conn.query("SELECT FOOD_ITEMS_ID FROM Fitness_Users_Food_items WHERE USER_ID=?", [[input.userID]],
                (err, data) => { 
                    cb(err, data[0]);
                  }); 
            }
        });
        var deleted = conn.query("SELECT ID FROM Fitness_Food_Items WHERE NAME=? AND ID=?", 
        [[input.name, input.thisID]],(err, data) => {
            if(err){
                cb(err);
                return;
            }
            model.get(data.insertId, (err, data)=>{
                cb(err, data);
            });
        });
        conn.query("DELETE * FROM Fitness_Food_Items WHERE ID=?", 
        [[input.deleted]], (err, data) => {
            cb(err, data[0]);
        });
    }
}; */

module.exports = model;