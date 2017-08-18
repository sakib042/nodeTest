//required files
var express = require('express');

var todoController = require('./controllers/todoController');

//main app object
var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listening port
app.listen('3000');
console.log('Listening to port 3000...');