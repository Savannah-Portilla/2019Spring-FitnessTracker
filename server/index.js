const express   = require('express');
const path      = require('path');
const Users     = require('./controllers/Users');
const Workouts     = require('./controllers/Workouts');
const Routines     = require('./controllers/Routines');
const Food_Items     = require('./controllers/Food_Items');
const Exercizes     = require('./controllers/Exercizes');
const Daily_Foods     = require('./controllers/Daily_Foods');

const app = express();
const port = 3320;

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



app.listen(port, () => console.log(`Example app http://localhost:${port}`));