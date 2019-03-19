const express = require('express');
const path = require('path');
const Users = require('./controllers/Users');

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "index.html")));
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/Users', Users);

app.listen(port, () => console.log(`Example app http://localhost:${port}`));