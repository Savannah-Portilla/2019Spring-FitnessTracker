const express   = require('express');
const path      = require('path');
const Users     = require('./controllers/Users');
const User      = require('./models/User');
const Workouts     = require('./controllers/Workouts');
const Workout      = require('./models/Workout');
const Routines     = require('./controllers/Routines');
const Routine      = require('./models/Routine');
const Food_Items     = require('./controllers/Food_Items');
const Food_Item      = require('./models/Food_Item');
const Exercizes     = require('./controllers/Exercizes');
const Exercize      = require('./models/Exercize');
const Daily_Foods     = require('./controllers/Daily_Foods');
const Daily_Food     = require('./models/Daily_Food');

const app = express();
const port = 3320;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(function(req, res, next) {
    try {
      const token = (req.headers.authorization || "").split(' ')[1]
      req.user = userModel.getFromToken(token);
    } catch (error) {
      const openActions = ['POST/users', 'POST/users/login']
      if(!openActions.includes(req.method + req.path)){ // check if login required
        next(Error("Login Required"));
      }
    }
    next();
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../NoFramework")));
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/Users', Users);
app.use('/Workouts', Workouts);
app.use('/Routines', Routines);
app.use('/Food_Items', Food_Items);
app.use('/Exercizes', Exercizes);
app.use('/Daily_Foods', Daily_Foods);

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({msg: err.message });
  })

app.listen(port, () => console.log(`Example app http://localhost:${port}`));