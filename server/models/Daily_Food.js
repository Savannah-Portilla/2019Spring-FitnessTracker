const conn = require('./mysql_connection');

const model = {
    getAll(cb){ // return all days worth of logs form THAT user how to specify?
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            } // ****** WHY IS ROUTINE "NEVER USED"?
            var thisID = conn.query("SELECT DAILY_FOODS_ID FROM Fitness_Users_Daily_Foods WHERE USER_ID=?", [[input.userID]], (err, data) => {
                if(err) {
                    cb(err,data);
                      return; 
                }
                conn.query("SELECT * FROM Fitness_Daily_Foods WHERE ID=?", [[input.thisID]], (err, data) => {
                    cb(err, data);   
                })
            });    
        });
    },
    get(id, cb){ // return todays food log from THAT user
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            } 
            var thisID = conn.query("SELECT DAILY_FOODS_ID FROM Fitness_Users_Daily_Foods WHERE USER_ID=?", [[input.userID]], (err, data) => {
                if(err) {
                  cb(err,data);
                    return; 
                }
                conn.query("SELECT * FROM Fitness_Daily_Foods WHERE date=? AND ID=?", [[input.date, input.thisID]], (err, data) => {
                    cb(err, data[0]);
                });
            });
        });    
      },
    add(input, cb){ // need to add food Itmes - how to link it with the other table?- grab items form there?
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            }
                var newadd = conn.query('INSERT ' + Fitness_Daily_Foods + ' SET ID = ' + mysql.escape(ID) + 
                                ', date = ' + mysql.escape(date) +
                                ', date_created = ' + mysql.escape(new Date()) +
                                ', calorie_total = ' + mysql.escape(calorie_total) +
                                ' WHERE Fitness_Users_Daily_Foods_User_ID = ' + [[input.userID]], (err) => {
                    if (err) throw err;
                    //SQL Search
                    conn.query('SELECT ' + newadd + 'FROM ' + Fitness_Daily_Foods, (err, result) => {
                        if (err) throw err;
                        call_back(result[0]);
                        
                    });
                });
        });
    },
    updateDailyFoods(input, cb){  // do my input arrays correspond to whats being input for specification (email and name) or for the table values?
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]],
        (err, data) => {
            if(err) {
                cb(err);
                return;
            }
            if(data.length < 1) {
                cb(Error("email not found"));
            } else {
                var thisID = conn.query("SELECT DAILY_FOODS_ID FROM Fitness_Users_Daily_Foods WHERE USER_ID=?", [[input.userID]],
                (err, data) => { 
                    cb(err, data[0]);
                  }); 
            }
        });
        var update = conn.query("SELECT ID FROM Fitness_Daily_Foods WHERE date=? AND ID=?", [[input.date, input.thisID]],
        (err, data) => {
            if(err){
                cb(err);
                return;
            }
            model.get(data.insertId, (err, data)=>{
                cb(err, data);
            });
        });
         var change = conn.query('INSERT ' + Fitness_Daily_Foods + ' SET ID = ' + mysql.escape(ID) + 
                                ', date = ' + mysql.escape(date) +
                                ', date_created = ' + mysql.escape(new Date()) +
                                ', calorie_total = ' + mysql.escape(calorie_total) +
                                ' WHERE Fitness_Users_Daily_Foods_User_ID = ' + [[input.userID]], (err) => {
                    if (err) throw err;
                    //SQL Search
                    conn.query('SELECT ' + change + 'FROM ' + Fitness_Daily_Foods, (err, result) => {
                        if (err) throw err;
                        call_back(result[0]);
                    });
                });
    },
    //delete a specific workout by email and workout name
    deleteDailyFoods(input,cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]],
        (err, data) => {
            if(err) {
                cb(err);
                return;
            }
            if(data.length < 1) {
                cb(Error("email not found"));
            } else {
                var thisID = conn.query("SELECT DAILY_FOODS_ID FROM Fitness_Users_Daily_Foods WHERE USER_ID=?", [[input.userID]],
                (err, data) => { 
                    cb(err, data[0]);
                  }); 
            }
        });
        var deleted = conn.query("SELECT ID FROM Fitness_Daily_Foods WHERE date=? AND ID=?", 
        [[input.date, input.thisID]],(err, data) => {
            if(err){
                cb(err);
                return;
            }
            model.get(data.insertId, (err, data)=>{
                cb(err, data);
            });
        });
        conn.query("DELETE * FROM Fitness_Daily_Foods WHERE ID=?", 
        [[input.deleted]], (err, data) => {
            cb(err, data[0]);
        });
    },
    getTotalCalories(input, cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]],
        (err, data) => {
            if(err) {
                cb(err);
                return;
            }
            if(data.length < 1) {
                cb(Error("email not found"));
            } else {
                var thisID = conn.query("SELECT DAILY_FOODS_ID FROM Fitness_Users_Daily_Foods WHERE USER_ID=?", 
                [[input.userID]],
                (err, data) => { 
                    cb(err, data[0]);
                  }); 
            }
        });
        conn.query("SELECT calorie_total FROM Fitness_Daily_Foods WHERE ID=?", [[input.thisID]],
        (err, data) => { 
            cb(err, data[0]);
          });
        
    },

    addFoodItems(input, cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            }
             // ****** WHY IS ROUTINE "NEVER USED"?
            var foodID = conn.query("SELECT * FOOD_ITEMS_ID FROM Fitness_Users_Food_Items WHERE USER_ID=?", 
            [[input.userID]], (err, data) => {
                if(err) {
                  cb(err,data);
                    return; 
                }
                var foodName = conn.query("SELECT name FROM Fitness_Food_Items WHERE name=? AND ID=?", 
                [[input.name,input.foodID]], (err, data) => {
                    if(err) {
                      cb(err,data);
                        return; 
                    }
                    conn.query('INSERT ' + Fitness_Daily_Foods + 'ADD Fitness_Daily_Foods_Food_name = ' + 
                    [[insert.foodName]], (err) => {
                        if (err) throw err;    
                    
                    })
                var foodCalroieAmount = conn.query("SELECT caloie_amount FROM Fitness_Food_Items WHERE name=? AND ID=?", 
                [[input.name,input.foodID]], (err, data) => {
                        if(err) {
                          cb(err,data);
                            return; 
                        }
                        conn.query("UPDATE calorie_total FROM Fitness_Daily_Foods WHERE calorie_total = calorie_total + ?" + 
                        [[insert.foodCalorieAmount]], (err) => {
                            if (err) throw err;   

                        })
                    });
                });
            });
        });
    },

    deleteFoodItems(input, cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            }
             // ****** WHY IS ROUTINE "NEVER USED"?
            var foodID = conn.query("SELECT EXERCIZE_ID FROM Fitness_Users_Daily_Foods WHERE USER_ID=?", 
            [[input.userID]], (err, data) => {
                if(err) {
                  cb(err,data);
                    return; 
                }
                var foodName = conn.query("SELECT ID FROM Fitness_Daily_Foods WHERE name=? AND ID=?", 
                [[input.name,input.foodID]], (err, data) => {
                    if(err) {
                      cb(err,data);
                        return; 
                    }
                 // insert exercize into routine
                 conn.query("DELETE Food_name FROM Fitness_Daily_Foods WHERE ID=?", 
                 [input.foodName], (err, data) => {
                     cb(err, data[0]);
                 });
                 var foodCalroieAmount = conn.query("SELECT caloie_amount FROM Fitness_Food_Items WHERE name=? AND ID=?", 
                [[input.name,input.foodID]], (err, data) => {
                        if(err) {
                          cb(err,data);
                            return; 
                        }
                        conn.query("UPDATE calorie_total FROM Fitness_Daily_Foods WHERE calorie_total = calorie_total - ?" + 
                        [[insert.foodCalorieAmount]], (err) => {
                            if (err) throw err;   

                        })
                    });
                });
            });
        });
    },
};

module.exports = model;
