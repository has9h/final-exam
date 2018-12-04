var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();                            //Init app

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Models

// Database Connection

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Static Files
app.use(express.static(path.join(__dirname, 'static')));

// Routes
app.get('/', function(request, response){
    // response.send('Hello World');                                            //Test
    response.render('index');
});

// Listen:
app.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function(){
   console.log('Server Started'); 
});