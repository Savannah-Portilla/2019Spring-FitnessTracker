const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM Fitness_Workouts");   
    },
    async getWorkout(id){
        const data = await conn.query("SELECT * FROM Fitness_Workouts WHERE Id=?", id);
        if(!data){
            throw Error("Workout not found");
        }
        return data[0];
    },
    async addWorkout(input){
        const data = await conn.query(
            `INSERT INTO Fitness_Workouts W Join Fitness_Users_Workouts UW On W.ID = UW.WORKOUT_ID 
            Join Fitness_Users U On UW.USER_ID = U.ID 
            (name,date_time,calories_burned,workout_minutes,created_at) WHERE U.VALUE=`, email, 
            [[input.name, input.date_time, input.calories_burned, input.workout_minutes, new Date()]]
        );
        return await model.get(data.insertId);
    },
    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    },
    async updateWorkout(email, name){
        const data = await conn.query(
            `Update Fitness_Workouts W Join Fitness_Users_Workouts UW On W.ID = UW.WORKOUT_ID 
            Join Fitness_Users U On UW.USER_ID = U.ID 
            Set ?
            WHERE U.VALUE= and W.VALUE=`, email, name);
        if(data.length == 0){
            throw Error('Workout Not Found')
        }else{
        return { status: "success", msg: "Workout Succesfully Updated" };
        }
    },  
    async deleteWorkout(email, name){
        const data = await conn.query(
            `DELETE * FROM Fitness_Workouts W Join Fitness_Users_Workouts UW On W.ID = UW.WORKOUT_ID 
            Join Fitness_Users U On UW.USER_ID = U.ID 
            WHERE U.VALUE= and W.VALUE=`, email, name);
        if(data.length == 0){
            throw Error('Workout Not Found')
        }else{
        return { status: "success", msg: "Workout Succesfully Deleted" };
        }
    }, 
}; 
    /* addWorkout(input, cb){  // add new workout
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
    }, */
    /* updateWorkout(input, cb){  // update an existing workout
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
}; */

module.exports = model;
