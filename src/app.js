const express = require('express');
const loginController = require('./controllers');

// ...

const app = express();

app.use(express.json());
app.post('/login', loginController.User.getLogin);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
