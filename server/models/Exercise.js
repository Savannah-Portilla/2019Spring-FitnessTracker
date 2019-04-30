const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM Fitness_Exercizes");   
    },
    async getID(id) {
        const data = await conn.query("SELECT * FROM Fitness_Exercizes WHERE id=?", id);
        if(!data) {
            throw Error('Exercise not added.')
        }
        return data;
    },
     async addExercise(input, user_ID){
        const data = await conn.query(
            "INSERT INTO Fitness_Exercizes (name,body_focus,reps,sets,date_created,user_ID) VALUES(?)",
            [[input.name, input.body_focus, input.reps, input.sets, new Date(), user_ID]]
        );
        return model.getID(data.insertId);
    }, 
    async updateExercise(email, name){
        const data = await conn.query(
            `Update Fitness_Exercizes E Join Fitness_Users_Exercizes UE On E.ID = UE.EXERCIZE_ID 
            Join Fitness_Users U On UE.USER_ID = U.ID 
            Set ?
            WHERE U.VALUE= and E.VALUE=`, email, name);
        if(data.length == 0){
            throw Error('Exercise Not Found')
        }else{
        return { status: "success", message: "Exercise Succesfully Updated" };
        }
    },  
    async deleteExercise(email, name){
        const data = await conn.query(
            `DELETE * FROM Fitness_Exercize E Join Fitness_Users_Exercize UE On E.ID = UE.EXERCIZE_ID 
            Join Fitness_Users U On UE.USER_ID = U.ID 
            WHERE U.VALUE= and W.VALUE=`, email, name);
        if(data.length == 0){
            throw Error('Exercise Not Found')
        }else{
        return { status: "success", message: "Exercise Succesfully Deleted" };
        }
    }, 
}; 

module.exports = model;