const conn = require('./mysql_connection');

const model = {
    getAll(input, cb){  // return all of users workouts
      var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
          if(err) {
            cb(err);
              return;
          }
      });
      var workoutID = conn.query("SELECT WORKOUT_ID FROM Fitness_Users_Workouts WHERE USER_ID=?", [[input.userID]], (err, data) => {
        if(err) {
          cb(err);
            return; 
        }
      });
      conn.query("SELECT * FROM Fitness_Workouts WHERE ID=?", [[input.workoutID]], (err, data) => {
        cb(err, data);   
      });
},
    getWorkout(input, cb){  // pull a specific workout by name
      var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
          if(err) {
            cb(err);
              return;
          }
      });
      var workoutID = conn.query("SELECT WORKOUT_ID FROM Fitness_Users_Workouts WHERE USER_ID=?", [[input.userID]], (err, data) => {
        if(err) {
          cb(err);
            return; 
        }
      });
      conn.query("SELECT * FROM Fitness_Workouts WHERE NAME=? AND ID=?", [[input.name, input.workoutID]], (err, data) => {
            cb(err, data[0]);
        });    
    },
    addWorkout(input, cb){  // add new workout
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]], (err, data) => {
            if(err) {
              cb(err,data);
                return;
            }
            // create new place for the new routine to be connected in the intermediate table
                var newWorkout = conn.query('INSERT ' + Fitness_Workouts + ' SET ID = ' + mysql.escape(ID) + 
                                ', name = ' + mysql.escape(name) +
                                ', date_created = ' + mysql.escape(new Date()) + 
                                ', date_time = ' + mysql.escape(date_time) +
                                ', calories_burned = ' + mysql.escape(calories_burned) +
                                ', workout_minutes = ' + mysql.escape(workout_minutes) +
                                ' WHERE Fitness_Users_Workouts_USER_ID = ' + [[input.userID]], (err) => {
                    if (err) throw err;
                    //SQL Search
                    conn.query('SELECT ' + newWorkout + 'FROM ' + Fitness_Workouts, (err, result) => {
                        if (err) throw err;
                        //console.log("User replaced with: " + result[0].ID);
                        call_back(result[0]);
                        
                    });
                });
        });
    },
    updateWorkout(input, cb){  // update an existing workout
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]],
        (err, data) => {
            if(err) {
                cb(err);
                return;
            };
            if(data.length < 1) {
                cb(Error("email not found"));
            } else {
                var workoutID = conn.query("SELECT WORKOUT_ID FROM Fitness_Users_Workouts WHERE USER_ID=?", [[input.userID]],
                (err, data) => { 
                    cb(err, data[0]);
                  }); 
            }
        });
        var workoutToUpdate = conn.query("SELECT ID FROM Fitness_Workouts WHERE NAME=? AND WORKOUT_ID=?", [[input.name, input.workoutID]],
        (err, data) => {
            if(err){
                cb(err);
                return;
            }
            model.get(data.insertId, (err, data)=>{
                cb(err, data);
            });
        });
         var changedWorkout = conn.query('INSERT ' + Fitness_Workouts + ' SET ID = ' + mysql.escape(ID) + 
                                ', name = ' + mysql.escape(name) +
                                ', date_created = ' + mysql.escape(new Date()) + 
                                ', date_time = ' + mysql.escape(date_time) +
                                ', calories_burned = ' + mysql.escape(calories_burned) +
                                ', workout_minutes = ' + mysql.escape(workout_minutes) +
                                ' WHERE Fitness_Workouts_ID = ' + [[input.workoutToUpdate]], (err) => {
                    if (err) throw err;
                    //SQL Search
                    conn.query('SELECT ' + changedWorkout + 'FROM ' + Fitness_Workouts, (err, result) => {
                        if (err) throw err;
                        //console.log("User replaced with: " + result[0].ID);
                        call_back(result[0]);
                        
                    });
                });
    },
    
    //delete a specific workout by email and workout name
    deleteWorkout(input,cb){
        var userID = conn.query("SELECT ID FROM Fitness_Users WHERE email=?", [[input.email]],
        (err, data) => {
            if(err) {
                cb(err);
                return;
            }
            if(data.length < 1) {
                cb(Error("email not found"));
            } else {
                var workoutID = conn.query("SELECT WORKOUT_ID FROM Fitness_Users_Workouts WHERE USER_ID=?", [[input.userID]],
                (err, data) => { 
                    cb(err, data[0]);
                  }); 
            }
        });
        var workoutToDelete = conn.query("SELECT ID FROM Fitness_Workouts WHERE NAME=? AND ID=?", [[input.name, input.workoutID]],
        (err, data) => {
            if(err){
                cb(err);
                return;
            }
            model.get(data.insertId, (err, data)=>{
                cb(err, data);
            })
        });
        conn.query("DELETE * FROM Fitness_Workouts WHERE ID=?", 
        [input.workoutToDelete], (err, data) => {
            cb(err, data[0]);
        });
    }
};

module.exports = model;
