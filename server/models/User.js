const conn = require('./mysql_connection');

const model = {
  get(email, cb){  // Return User Information by email serch
    conn.query("SELECT * FROM Fitness_Users WHERE email=?", email, (err, data) => { 
      cb(err, data[0]);
    });    
  },
  addUser(input, cb){   // Signup a new user
    // make sure password is long enough
    if(input.password.length < 6){
      cb(Error('A longer Password is Required'));
        return;
    }   
    // check if email is taken
    conn.query("SELECT * FROM Fitness_Users WHERE email =?" + mysql.escape(email), (err, result) => {
      if (err) throw err;
        if (result.length > 0) {
          call_back("409");
        }
        else {
    // otherwise add new user information into table - will this work? or so i need an if-else statement?
          conn.query( "INSERT INTO Fitness_Users (ID, f_name, l_name, password, weight, weight_goal, email, created_at) VALUES (?)",
          [[input.ID, input.f_name, input.l_name, input.password, input.weight, input.weight_goal, input.email, new Date()]],
          (err, data) => {
            if(err){
              cb(err);
                return;
            }
            model.get(data.insertId, (err, data)=>{
              cb(err, data);
            })
          })
        }
      })  
  },
  //Search for a user by email and password
  loginUser(email, password, cb) { 
        //SQL Search
        conn.query("SELECT * FROM Fitness_Users WHERE email=? and password=?" + mysql.escape(email) + mysql.escape(password), (err, result) => {
            if (err) throw err;
            //A user was found
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].password == password) {
                        cb(result[0]);
                    }
                }
            }
            //User was not found
            else {
                call_back("404");
            }
        });
  },
  //Search for a user by email and update the user
  updateUser(email, cb) {  
    var namealreadyExists = false;
    //SQL Search
    conn.query('SELECT * FROM ' + Fitness_Users + ' WHERE email = ' + mysql.escape(email), (err, result) => { 
      if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          if (result[i].email != email) {
            namealreadyExists = true;
          }
        }
            //email is free
      if (!namealreadyExists) {
            //SQL Change
        conn.query('Update ' + Fitness_Users + ' SET email = ' + mysql.escape(email) + 
                                ', password = ' + mysql.escape(password) +
                                ', f_name = ' + mysql.escape(f_name) + ', l_name = ' + mysql.escape(l_name) +
                                ', weight = ' + mysql.escape(weight) +
                                ', weightGoals = ' + mysql.escape(weightGoals) +
                                ' WHERE email = ' + mysql.escape(email), (err) => {
                    if (err) throw err;
                    //SQL Search
                    conn.query('SELECT * FROM ' + Fitness_Users + ' WHERE email = ' + mysql.escape(email), (err, result) => {
                        if (err) throw err;
                        //console.log("User replaced with: " + result[0].ID);
                        call_back(result[0]);
                    });
                });
            }
            //email is taken
            else {
                call_back("409");
            }
        });
    }
};
    module.exports = model;
