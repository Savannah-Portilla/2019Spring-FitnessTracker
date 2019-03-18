module.exports = (sequelize, DataTypes) => 
    sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
})



//const conn = require('./mysql_connection');

//const model = {
    //getAll(cb){
    //    conn.query("SELECT * FROM Fitness_Users", (err, data) => {  //table name
       //     cb(err, data);
      //  });    
  //  },
  //  get(id, cb){
  //      conn.query("SELECT * FROM Fitness_Users WHERE Id=?", id, (err, data) => { //table name
    //        cb(err, data[0]);
      //  });    
    //},
    //add(input, cb){
      //  if(input.password.length < 4){
        //    cb(Error('A longer Password is Required'));
          //  return;
       // }
        //conn.query( "INSERT INTO Fitness_Users (user_id,f_name,l_name,password,created_at) VALUES (?)",
          //          [[input.user_id, input.f_name, input.l_name, input.password, new Date()]],
            //        (err, data) => {
              //          if(err){
                 //            cb(err);
                  //          return;
                    //    }
                 //       model.get(data.insertId, (err, data)=>{
                   //         cb(err, data);
                     //   })
                   // }
       // );  
   // }
//},
//module.exports = model;
