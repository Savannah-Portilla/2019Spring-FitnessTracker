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
        const data = await conn.query("SELECT * FROM Fitness_Routines WHERE user_ID=?", id);
        if(!data){
            throw Error("Routine not found");
        }
        return data;
    },
    async getID(id) {
        const data = await conn.query("SELECT ID FROM Fitness_Routines WHERE id=?", id);
        if(!data) {
            throw Error('Routine not added.')
        }
        return data;
    },

    async addRoutine(input, user_ID){
        const data = await conn.query(
            "INSERT INTO Fitness_Routines (name,exercises,date_created,user_ID) VALUES(?)",
            [[input.name, input.exercises, new Date(), user_ID]]
        );
        return model.getID(data.insertId);
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
        return { status: "success", message: "Routine Succesfully Updated" };
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
        return { status: "success", message: "Routine Succesfully Deleted" };
        }
    }, 

    async addExercizesToRoutine(input){
        const data = await conn.query(
            `INSERT INTO Fitness_Routines R Join Fitness_Users_Routines UR On R.ID = UR.ROUTINE_ID 
            Join Fitness_Users U On UR.USER_ID = U.ID 
            (exercizes,date_updated) WHERE U.VALUE= AND R.VALUE=`, email, name, 
            [[input.exercizes, new Date()]]
        );
    },
    
    async deleteExercizesFromRoutine(email, name){
        const data = await conn.query(
            `DELETE Fitness_Routines_exercizes FROM Fitness_Routines R Join Fitness_Users_Routines UR On R.ID = UR.ROUTINE_ID 
            Join Fitness_Users U On UR.USER_ID = U.ID 
            WHERE U.VALUE= and R.VALUE=`, email, exercizes);
        if(data.length == 0){
            throw Error('Exercize Not Found')
        }else{
        return { status: "success", message: "Routine Exercize Succesfully Deleted" };
        }
    }, 
};

module.exports = model;