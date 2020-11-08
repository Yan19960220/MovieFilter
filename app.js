const router = require('./api/routes/movie_route');
var request = require('request');
var path = require('path');
const { connect } = require('http2');
var express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    http = require('http'),
    movie = require('./api/models/movie'),
    bodyParser = require('body-parser'),
    routes = require('./api/routes/movie_route'),
    userroute = require('./api/models/user'),
    fs = require('fs');;

app.use(bodyParser.urlencoded({ 
    extended: true 
}));
app.use(bodyParser.json());

//mongoose instance connection url connection
mongoose.Promise = global.Promise;
const dbPath = 'mongodb+srv://yan:zhangyan@cluster0.3al0j.mongodb.net/project0?retryWrites=true&w=majority';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);

mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
});
var db = mongoose.connection;

//Check DB Connection
if (!db)
    console.log("Error connecting db");
else
    console.log("DB Connected Successfully");

var port = process.env.PORT || 3000;

//Use API routes in the App
app.use('/api', routes);
app.use('/api/users', userroute);
// Public folder for assets
app.use(express.static('public'));

// Set view engine to ejs
app.set('view engine', 'ejs', 'html');

// Main page route
app.get('/', function(req, res) {
    res.render('login');
    
});

app.get('/home', function(req, res) {
    res.render('home');
    
});

app.get('/register', function(req, res) {
    var user = req.query.username;
    var password = req.query.password;
    var confirm = req.query.password_confirmation;
    console.log(password);
    console.log(confirm);
    if(confirm == password){
        res.render('login');
    }else{
        res.render('register');
    }
});

// about page route
app.get('/about', (req, res) => res.render('about'));

// results page route
app.get('/results', function(req, res) {
    var query = req.query.search;
    var year = req.query.year;
    var url = '';
    if (typeof year == "undefined" || year == null || year == ""){
        // URIs that meet the REST architectural style
        url = 'http://localhost:3000/api/movies/' + query;
    }else{
        // URIs that do not meet the REST architectural style, hhh, just for learning!
        url = 'http://localhost:3000/api/movies/?t=' + query + '&y=' + year;
    }
    console.log(url);
    request.get(url, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            console.log(data);
            res.render('results', { data: data });
        }else{
            console.error(error);
        }
    });
});

// Display message if page or route don't exist
app.get('*', (req, res) => res.send('Page NOT found!'));

app.listen(port, function(err) {
    if (err) console.log(err); 
    console.log("Running FirstRest on Port "+ port);
});