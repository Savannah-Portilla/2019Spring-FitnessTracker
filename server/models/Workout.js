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
        const data = await conn.query("SELECT * FROM Fitness_Workouts WHERE user_ID=?", id);
        if(!data){
            throw Error("Workout not found");
        }
        return data;
    },
    async getID(id) {
        const data = await conn.query("SELECT ID FROM Fitness_Workouts WHERE id=?", id);
        if(!data) {
            throw Error('Workout not added.')
        }
        return data;
    },
    async addWorkout(input, user_ID){
        const data = await conn.query(
            "INSERT INTO Fitness_Workouts (description,date_time,calories_burned,workout_minutes,user_ID) VALUES(?)",
            [[input.description, new Date(), input.calories_burned, input.workout_minutes, user_ID]]
        );
        return model.getID(data.insertId);
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
        return { status: "success", message: "Workout Succesfully Updated" };
        }
    },  
    async deleteWorkout(ID){
        console.log(ID)
        return await conn.query(`DELETE FROM Fitness_Workouts WHERE ID=?`, ID);
        /*const data = await conn.query(
            "DELETE FROM Fitness_Workouts WHERE ID=?", id);
        if(data.length == 0){
            throw Error('Workout Not Found')
        }else{
        return { status: "success", message: "Workout Succesfully Deleted" };
        }*/
    }, 
}; 

module.exports = model;
