const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM Fitness_Exercizes");   
    },
    async getExercize(id){
        const data = await conn.query("SELECT * FROM Fitness_Exrcizes WHERE Id=?", id);
        if(!data){
            throw Error("Exercize not found");
        }
        return data[0];
    },
    async addExercize(input){
        const data = await conn.query(
            `INSERT INTO Fitness_Exercizes E Join Fitness_Users_Exercizes UE On E.ID = UE.EXERCIZE_ID 
            Join Fitness_Users U On UE.USER_ID = U.ID 
            (name,date_created,date_updated) WHERE U.VALUE=`, email, 
            [[input.name, input.date_created, new Date()]]
        );
        return await model.get(data.insertId);
    },
    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    },
    async updateExercize(email, name){
        const data = await conn.query(
            `Update Fitness_Exercizes E Join Fitness_Users_Exercizes UE On E.ID = UE.EXERCIZE_ID 
            Join Fitness_Users U On UE.USER_ID = U.ID 
            Set ?
            WHERE U.VALUE= and E.VALUE=`, email, name);
        if(data.length == 0){
            throw Error('Exercize Not Found')
        }else{
        return { status: "success", message: "Exercize Succesfully Updated" };
        }
    },  
    async deleteExercize(email, name){
        const data = await conn.query(
            `DELETE * FROM Fitness_Exercize E Join Fitness_Users_Exercize UE On E.ID = UE.EXERCIZE_ID 
            Join Fitness_Users U On UE.USER_ID = U.ID 
            WHERE U.VALUE= and W.VALUE=`, email, name);
        if(data.length == 0){
            throw Error('Exercize Not Found')
        }else{
        return { status: "success", message: "Exercize Succesfully Deleted" };
        }
    }, 
}; 






/* const model = {
        getAll(cb){ // get all exercizes of user
            var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
                if(err) {
                  cb(err,data);
                    return;
                } // ****** WHY IS ROUTINE "NEVER USED"?
                var thisID = conn.query("SELECT EXERCIZE_ID FROM Fitness_Users_Exercize WHERE USER_ID=?", [[input.userID]], (err, data) => {
                    if(err) {
                        cb(err,data);
                          return; 
                    }
                    conn.query("SELECT * FROM Fitness_Exercizes WHERE ID=?", [[input.thisID]], (err, data) => {
                        cb(err, data);   
                    });
                });    
            });
        },
    getExercize(id, cb){ // get one exercize of user
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            } // ****** WHY IS ROUTINE "NEVER USED"?
            var thisID = conn.query("SELECT EXERCIZE_ID FROM Fitness_Users_Exercizes WHERE USER_ID=?", [[input.userID]], (err, data) => {
                if(err) {
                  cb(err,data);
                    return; 
                }
                conn.query("SELECT * FROM Fitness_Exercizes WHERE NAME=? AND ID=?", [[input.name, input.thisID]], (err, data) => {
                    cb(err, data[0]);
                });
            });
        });    
      },
    addExercize(input, cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            }
                var newadd = conn.query('INSERT ' + Fitness_Exercizes + ' SET ID = ' + mysql.escape(ID) + 
                                ', name = ' + mysql.escape(name) +
                                ', date_create = ' + mysql.escape(new Date()) + 
                                ', date_updated = ' + mysql.escape(date_updated) +
                                ' WHERE Fitness_Users_Exercizes_USER_ID = ' + [[input.userID]], (err) => {
                    if (err) throw err;
                    //SQL Search
                    conn.query('SELECT ' + newadd + 'FROM ' + Fitness_Exercizes, (err, result) => {
                        if (err) throw err;
                        //console.log("User replaced with: " + result[0].ID);
                        call_back(result[0]);
                        
                    });
                });
        });
    },
    updateExercize(input, cb){ 
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]],
        (err, data) => {
            if(err) {
                cb(err);
                return;
            }
            if(data.length < 1) {
                cb(Error("email not found"));
            } else {
                var thisID = conn.query("SELECT EXERCIZE_ID FROM Fitness_Users_Exercizes WHERE USER_ID=?", [[input.userID]],
                (err, data) => { 
                    cb(err, data[0]);
                  }); 
            }
        });
        var update = conn.query("SELECT ID FROM Fitness_Exercizes WHERE NAME=? AND ID=?", [[input.name, input.thisID]],
        (err, data) => {
            if(err){
                cb(err);
                return;
            }
            model.get(data.insertId, (err, data)=>{
                cb(err, data);
            });
        });
         var change = conn.query('INSERT ' + Fitness_Exercizes + ' SET ID = ' + mysql.escape(ID) + 
                                        ', name = ' + mysql.escape(name) +
                                        ', date_create = ' + mysql.escape(new Date()) + 
                                        ', date_updated = ' + mysql.escape(date_updated) +
                                        ' WHERE Fitness_Exercizes_ID = ' + [[input.update]], (err) => {
                    if (err) throw err;
                    //SQL Search
                    conn.query('SELECT ' + change + 'FROM ' + Fitness_Exercizes, (err, result) => {
                        if (err) throw err;
                        call_back(result[0]);
                    });
                });
    },
    //delete a specific workout by email and workout name
    deleteExercize(input,cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]],
        (err, data) => {
            if(err) {
                cb(err);
                return;
            }
            if(data.length < 1) {
                cb(Error("email not found"));
            } else {
                var thisID = conn.query("SELECT EXERCIZE_ID FROM Fitness_Users_Exercizes WHERE USER_ID=?", [[input.userID]],
                (err, data) => { 
                    cb(err, data[0]);
                  }); 
            }
        });
        var deleted = conn.query("SELECT ID FROM Fitness_Exercizes WHERE NAME=? AND ID=?", 
        [[input.name, input.thisID]],(err, data) => {
            if(err){
                cb(err);
                return;
            }
            model.get(data.insertId, (err, data)=>{
                cb(err, data);
            });
        });
        conn.query("DELETE * FROM Fitness_Exercizes WHERE ID=?", 
        [[input.deleted]], (err, data) => {
            cb(err, data[0]);
        });
    }
}; */

module.exports = model;