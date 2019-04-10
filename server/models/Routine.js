const conn = require('./mysql_connection');

const model = {
    getAll(cb){ // get all routines of user
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
    },

    addExercizesToRoutine(input, cb){
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
    },

    deleteExercizesFromRoutine(input, cb){
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
            
    updateRoutine(input, cb){
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
    }
};

module.exports = model;