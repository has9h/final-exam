var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();                            //Init app

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Models
var Books = require('./models/books');

// Database Connection
mongoose.connect('mongodb://localhost/');
var db = mongoose.connection;
// Check connection:
db.once('open', function(){
  console.log("Mongoose Connected to MongoDB");
});
// Check for Database errors:
db.on('error', function(err){
  console.log(err);
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

// Bring in Models:
var Book = require('../models/books');

app.post('/add', function(request, response){
  request.checkBody('title', 'Title is required').notEmpty();
  request.checkBody('author', 'Author is required').notEmpty();
  request.checkBody('rating', 'Rating is required').notEmpty();

  // Get errors:
  var errors = request.validationErrors();
    var book = new Book();
    book.title = request.body.title;             //This is where bodyParser is needed
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
router.get('/book/:id', function(request, response){
  Book.findById(request.params.id, function(error, book){
    // console.log(article);
    // return;
    response.render('index', {
        book: book
    });
  });
});

app.get('/help', function(request, response){
   response.send('PLEASE HELP!'); 
});

// Listen:
app.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function(){
   console.log('Server Started'); 
});