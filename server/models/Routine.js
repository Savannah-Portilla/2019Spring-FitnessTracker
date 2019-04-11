const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM Fitness_Routines");   
    },
    async getRoutine(id){
        const data = await conn.query("SELECT * FROM Fitness_Routines WHERE Id=?", id);
        if(!data){
            throw Error("Routine not found");
        }
        return data[0];
    },
    async addRoutine(input){
        const data = await conn.query(
            `INSERT INTO Fitness_Routines R Join Fitness_Users_Routines UR On R.ID = UR.ROUTINE_ID 
            Join Fitness_Users U On UR.USER_ID = U.ID 
            (name,date_created,exercizes,date_updated) WHERE U.VALUE=`, email, 
            [[input.name, input.date_created, input.exercizes, new Date()]]
        );
        return await model.get(data.insertId);
    },
    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    },
    async updateRoutine(email, name){
        const data = await conn.query(
            `Update Fitness_Routines R Join Fitness_Users_Routines UR On R.ID = UR.ROUTINE_ID 
            Join Fitness_Users U On UR.USER_ID = U.ID 
            Set ?
            WHERE U.VALUE= and R.VALUE=`, email, name);
        if(data.length == 0){
            throw Error('Routine Not Found')
        }else{
        return { status: "success", msg: "Routine Succesfully Updated" };
        }
    },  
    async deleteRoutine(email, name){
        const data = await conn.query(
            `DELETE * FROM Fitness_Routines R Join Fitness_Users_Routines UR On R.ID = UR.ROUTINE_ID 
            Join Fitness_Users U On UR.USER_ID = U.ID 
            Set ?
            WHERE U.VALUE= and R.VALUE=`, email, name);
        if(data.length == 0){
            throw Error('Routine Not Found')
        }else{
        return { status: "success", msg: "Routine Succesfully Deleted" };
        }
    }, 



    /* getAll(cb){ // get all routines of user
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            } // ****** WHY IS ROUTINE "NEVER USED"?
            var routineID = conn.query("SELECT ROUTINE_ID FROM Fitness_Users_Routines WHERE USER_ID=?", [[userID]], (err, data) => {
                if(err) {
                    cb(err,data);
                      return; 
                }
                conn.query("SELECT * FROM Fitness_Routines WHERE ID=?", [[routineID]], (err, data) => {
                    cb(err, data);   
                })
            });    
        });
    },
    getRoutine(input, cb){ // return one routine of user
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            } // ****** WHY IS ROUTINE "NEVER USED"?
            var routineID = conn.query("SELECT ROUTINE_ID FROM Fitness_Users_Routine WHERE USER_ID=?", [[input.userID]], (err, data) => {
                if(err) {
                  cb(err,data);
                    return; 
                }
                conn.query("SELECT * FROM Fitness_Routines WHERE NAME=? AND ROUTINE_ID=?", [[input.name, input.routineID]], (err, data) => {
                    cb(err, data[0]);
                });
            });
        });    
      },

    addRoutine(input, cb){  // ?? need to add exercizes to this table and also exercizes table
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            }
            // create new place for the new routine to be connected in the intermediate table
                var newRoutine = conn.query('INSERT ' + Fitness_Routines + ' SET ID = ' + mysql.escape(ID) + 
                                ', name = ' + mysql.escape(name) +
                                ', date_create = ' + mysql.escape(new Date()) + 
                                ', date_updated = ' + mysql.escape(date_updated) + // have to inner join
                                ' WHERE Fitness_Users_Routines_USER_ID = ' + [[input.userID]], (err) => {
                    if (err) throw err;
                    //SQL Search
                    conn.query('SELECT ' + newRoutine + 'FROM ' + Fitness_Routines, (err, result) => {
                        if (err) throw err;
                        //console.log("User replaced with: " + result[0].ID);
                        call_back(result[0]);
                        
                    });
                });
        });
    }, */
    async addExercizesToRoutine(input){
        const data = await conn.query(
            `INSERT INTO Fitness_Routines R Join Fitness_Users_Routines UR On R.ID = UR.ROUTINE_ID 
            Join Fitness_Users U On UR.USER_ID = U.ID 
            (exercizes,date_updated) WHERE U.VALUE= AND R.VALUE=`, email, name, 
            [[input.exercizes, new Date()]]
        );
    },
    /* addExercizesToRoutine(input, cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            }
             // ****** WHY IS ROUTINE "NEVER USED"?
            var exercizeID = conn.query("SELECT * EXERCIZE_ID FROM Fitness_Users_Exercizes WHERE USER_ID=?", 
            [[input.userID]], (err, data) => {
                if(err) {
                  cb(err,data);
                    return; 
                }
                var exercizeName = conn.query("SELECT FROM Fitness_Exercizes WHERE name=? AND ID=?", 
                [[input.name,input.exercizeID]], (err, data) => {
                    if(err) {
                      cb(err,data);
                        return; 
                    }
                 // insert exercize into routine
                    conn.query('INSERT ' + Fitness_Routines + ' ADD Fitness_Routines_Exercize_name = ' + 
                    [[insert.exercizeName]], (err) => {
                        if (err) throw err;    
                    
                    })
                });
            });
        });
    }, */
    async deleteExercizesFromRoutine(email, name){
        const data = await conn.query(
            `DELETE Fitness_Routines_exercizes FROM Fitness_Routines R Join Fitness_Users_Routines UR On R.ID = UR.ROUTINE_ID 
            Join Fitness_Users U On UR.USER_ID = U.ID 
            WHERE U.VALUE= and R.VALUE=`, email, exercizes);
        if(data.length == 0){
            throw Error('Exercize Not Found')
        }else{
        return { status: "success", msg: "Routine Exercize Succesfully Deleted" };
        }
    }, 
    /* deleteExercizesFromRoutine(input, cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            }
             // ****** WHY IS ROUTINE "NEVER USED"?
            var exercizeID = conn.query("SELECT EXERCIZE_ID FROM Fitness_Users_Exercizes WHERE USER_ID=?", 
            [[input.userID]], (err, data) => {
                if(err) {
                  cb(err,data);
                    return; 
                }
                var exercizeName = conn.query("SELECT ID FROM Fitness_Exercizes WHERE name=? AND ID=?", 
                [[input.name,input.exercizeID]], (err, data) => {
                    if(err) {
                      cb(err,data);
                        return; 
                    }
                 // insert exercize into routine
                 conn.query("DELETE Exercize_name FROM Fitness_Routines WHERE ID=?", 
                 [input.exercizeName], (err, data) => {
                     cb(err, data[0]);
                 });
                });
            });
        });
    },
             */
    /* updateRoutine(input, cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]],
        (err, data) => {
            if(err) {
                cb(err);
                return;
            }
            if(data.length < 1) {
                cb(Error("email not found"));
            } else {
                var routineID = conn.query("SELECT ROUTINE_ID FROM Fitness_Users_Routines WHERE USER_ID=?", [[input.userID]],
                (err, data) => { 
                    cb(err, data[0]);
                  }); 
            }
        });
        var routineToUpdate = conn.query("SELECT ID FROM Fitness_Routines WHERE NAME=? AND ID=?", [[input.name, input.routineID]],
        (err, data) => {
            if(err){
                cb(err);
                return;
            }
            model.get(data.insertId, (err, data)=>{
                cb(err, data);
            });
        });
         var changedRoutine = conn.query('INSERT ' + Fitness_Routines + ' SET ID = ' + mysql.escape(ID) + 
                                        ', name = ' + mysql.escape(name) +
                                        ', date_create = ' + mysql.escape(new Date()) + 
                                        ', date_updated = ' + mysql.escape(date_updated) +
                                        ' WHERE Fitness_Routines_ID = ' + [[input.routineToUpdate]], (err) => {
                    if (err) throw err;
                    //SQL Search
                    conn.query('SELECT ' + changedRoutine + 'FROM ' + Fitness_Routines, (err, result) => {
                        if (err) throw err;
                        call_back(result[0]);
                    });
                });
    },
    //delete a specific workout by email and workout name
    deleteRoutine(input,cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]],
        (err, data) => {
            if(err) {
                cb(err);
                return;
            }
            if(data.length < 1) {
                cb(Error("email not found"));
            } else {
                var routineID = conn.query("SELECT ROUTINE_ID FROM Fitness_Users_Routines WHERE USER_ID=?", [[input.userID]],
                (err, data) => { 
                    cb(err, data[0]);
                  }); 
            }
        });
        var routineToDelete = conn.query("SELECT ID FROM Fitness_Routines WHERE NAME=? AND ID=?", 
        [[input.name, input.routineID]],(err, data) => {
            if(err){
                cb(err);
                return;
            }
            model.get(data.insertId, (err, data)=>{
                cb(err, data);
            });
        });
        conn.query("DELETE * FROM Fitness_Routines WHERE ID=?", 
        [[input.routineToDelete]], (err, data) => {
            cb(err, data[0]);
        });
    } */
};

module.exports = model;