var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');


mongoose.connect('mongodb://localhost:27070/kiebeleinkaufen');

app.use(cors());
app.options("*", cors());

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


var Todo = mongoose.model('Todo', {
	name:String,
	amount:String,
	count:Number,
	art:String
});

app.get('/api/items', function(req, res) {

    Todo.find(function(err, todos) {

        if (err)
            res.send(err);

        res.json(todos); /
        console.log(todos);
    });
});

app.post('/api/items', function(req, res) {

    Todo.create({
        name : req.body.name,
		amount : req.body.amount,
		count : req.body.count,
		art : req.body.art,
        done : false
    }, function(err, todo) {
        if (err)
            res.send(err);

        Todo.find(function(err, todos) {
            if (err)
                res.send(err);
            res.json(todos);
        });
    });

});

// delete a todo
app.delete('/api/items/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        Todo.find(function(err, todos) {
            if (err)
                res.send(err);
            res.json(todos);
        });
    });
});

// create a user
app.post('/api/user/new', function(req, res) {
    // collect data from post
    var response;
    var time = Date.now();
    var postData = {
        email: req.body.email,
        password: hash("sha512", req.body.password),
        name: req.body.name,
        family: req.body.family,
        signDate: time
    };

    // get a key for the user
    var newKey = firebase.database().ref().child('users').push().key;
    var updates = {};
    updates['/users/' + newKey] = postData;

    if (db.ref().update(updates)) {
        response = {
            msg: "User " + postData.email + " successfully created.",
            user: {
                email: req.body.email,
                password: hash("sha512", req.body.password),
                name: req.body.name,
                family: req.body.family,
                signDate: time
            }
        };
    }
    else {
        response = {
            msg: "User " + postData.email + " was not created.",
            user: {
                email: req.body.email,
                name: req.body.name,
                family: req.body.family,
                signDate: time
            }
        };
    }


    res.send(response);
});


// application -------------------------------------------------------------
app.get('', function(req, res) {
    res.sendfile('./public/index.html');
});




app.listen(3000, "0.0.0.0");
console.log("App listening on port 3000");
