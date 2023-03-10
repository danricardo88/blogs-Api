const express = require('express');
const control = require('./controllers');
const middle = require('./middlewares');
// ...

const app = express();

app.use(express.json());
app.post('/login', control.User.getLogin);
app.post('/user', middle.handleUser, control.User.userCreate);
app.get('/user', middle.handleToken, control.User.getAll);
app.get('/user/:id', middle.handleToken, control.User.getId);
app.post('/categories', middle.handleToken,
 middle.handleTokenCategories, control.Category.categoriesCreate);
app.get('/categories', middle.handleToken, control.Category.getAll);
app.get('/post', middle.handleToken, control.BlogPosts.getAll);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
