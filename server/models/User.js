const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {
  async getAll(){
    return await conn.query("SELECT * FROM Fitness_Users");   
  },
  /* async get(id){  // Return User Information by email serch
    const data = await conn.query("SELECT * FROM Fitness_Users WHERE ID=?", id)
    if(!data.length){
      throw Error("User not found");
    }
    return data[0];  
  }, */
  //select by user id
  async get(input){
    const data = await conn.query("SELECT ID FROM Fitness_Users WHERE email=?", input.email);
    if(!data) {
        throw Error("User not found")
    }
    return data[0];
},
  async register(input){   // Signup a new user
    // make sure password is long enough
    if(!input.password){
      throw Error('Password is Required');
    }
    if(input.password.length < 6){
      throw Error('A longer Password is Required');
    }
    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS)
    const data = await conn.query(
      "INSERT INTO Fitness_Users (f_name,l_name,password,weight,weight_goal,email,birthday,date_created) VALUES (?)",
      [[input.f_name, input.l_name, hashedPassword, input.weight, input.weight_goal, input.email, input.birthday, new Date()]] 
      );
      return await model.get(data.insertId);
  },
  getFromToken(token){
    return jwt.verify(token, JWT_SECRET);
  }, 
  //Search for a user by email and password
  async login(email, password){
    //console.log({ email, password })
    const data = await conn.query(`SELECT * FROM Fitness_Users WHERE email=?`, email);
    if(data.length == 0){
        throw Error('User Not Found');
    }
    const x = await bcrypt.compare(password, data[0].password);
    if(x){
        const user = {...data[0], password: null};
        return {user, token: jwt.sign(user, JWT_SECRET)};
    }else{
        throw Error('Wrong Password');
    }
  },
  async changePassword(email, oldPassword, newPassword){
    const data = await conn.query(`SELECT * FROM Fitness_Users WHERE email=?`, email);
    if(data.length == 0){
        throw Error('User Not Found')
    }
    if(data[0].Password == "" || await bcrypt.compare(oldPassword, data[0].password)){
        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
        await conn.query(`Update Fitness_Users
                        Set ?
                    WHERE email=?`,[ {Password: hashedPassword }, data[0].email]);
        return { status: "success", message: "Password Succesfully Changed" };
    }else{
        throw Error('Wrong Password');
    }
},
async updateUser(email){
  const data = await conn.query(
      `Update Fitness_Users
      Set ?
      WHERE VALUE=`, email);
  if(data.length == 0){
      throw Error('User Not Found')
  }else{
  return { status: "success", message: "User Succesfully Updated" };
  }
},  
async deleteUser(email){
  const data = await conn.query(
      `DELETE * FROM Fitness_Users WHERE VALUE=`, email);
  if(data.length == 0){
      throw Error('User Not Found')
  }else{
  return { status: "success", message: "User Succesfully Deleted" };
  }
}, 
}; 
    module.exports = model;
