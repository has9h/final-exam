var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();                            //Init app

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Models
var Book = require('./models/books');

// Database Connection
var db;
var db_url = "mongodb://" + process.env.IP + ":27018";

mongoose.connect(db_url + "/books");
mongoose.connection.on('error', function(err){
  console.log(err);
  console.log('Could not connect to MongoDB');
});

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static Files
app.use(express.static(path.join(__dirname, 'static')));

// Routes
app.get('/', function(request, response){
    // response.send('Hello World');                                            //Test
    response.render('index');
});

app.post('/add', function(request, response){
  request.checkBody('title', 'Title is required').notEmpty();
  request.checkBody('author', 'Author is required').notEmpty();
  request.checkBody('rating', 'Rating is required').notEmpty();

  // Get errors:
  var errors = request.validationErrors();
    var book = new Book();
    book.title = request.body.title;
    book.author = request.body.author;
    book.rating = request.body.rating;

    book.save(function(error){
      if(error){
        console.log(error);
        return;
      } else {
        request.flash('success', 'Book Added');
        response.redirect('/');
      }
    });
  // console.log('Submitted');
  // return;
});

// Single View:
app.get('/book/:id', function(request, response){
  Book.findById(request.params.id, function(error, book){
    // console.log(article);
    // return;
    response.render('index', {
        book: book
    });
  });
});

// List View:
app

app.get('/help', function(request, response){
   response.send('PLEASE HELP!'); 
});

// Listen:
app.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function(){
   console.log('Server Started'); 
});