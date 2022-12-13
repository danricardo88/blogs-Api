const express = require('express');
const userController = require('./controllers');

// ...

const app = express();

app.use(express.json());
app.post('/login', userController.User.getLogin);
app.post('/user', userController.User.userCreate);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
