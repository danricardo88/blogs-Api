const express = require('express');
const userController = require('./controllers');
const userMiddlewares = require('./middlewares');

// ...

const app = express();

app.use(express.json());
app.post('/login', userController.User.getLogin);
app.post('/user', userController.User.userCreate);
app.get('/user', userMiddlewares.handleToken, userController.User.getAll);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
