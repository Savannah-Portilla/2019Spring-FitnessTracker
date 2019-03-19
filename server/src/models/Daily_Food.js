const conn = require('./mysql_connection');

const model = {
    getAll(cb){
        conn.query("SELECT * FROM Fitness_Food_Lists", (err, data) => {
            cb(err, data);
        });    
    },
    get(id, cb){
        conn.query("SELECT * FROM Fitness_Food_Lists WHERE Id=?", id, (err, data) => {
            cb(err, data[0]);
        });    
    },
    add(input, cb){
        if(input.Password.length < 8){
            cb(Error('A longer Password is Required'));
            return;
        }
        conn.query( "INSERT INTO Fitness_Food_Lists (food_id,date,user_id,created_at) VALUES (?)",
                    [[input.food_id, input.date, input.user_id, new Date()]],
                    (err, data) => {
                        if(err){
                            cb(err);
                            return;
                        }
                        model.get(data.insertId, (err, data)=>{
                            cb(err, data);
                        })
                    }
        );    
    }
};

module.exports = model;