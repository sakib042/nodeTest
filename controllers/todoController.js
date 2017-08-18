var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://sakib:sakib@ds131583.mlab.com:31583/node_sample');

//Create Schema - like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var bodyParserUrl = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

    app.get('/todo', function(req, res) {
        //get data from mongodb and pass it to view
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todo: data });
        });
    });

    app.post('/todo', bodyParserUrl, function(req, res) {
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res) {
        //delete the requested item from mongodb
        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
};