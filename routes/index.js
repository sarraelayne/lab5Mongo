var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB',{ useNewUrlParser: true });
var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model
var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
});

/* GET home page. */
router.post('/comment', function(req, res, next) {
    console.log("POST comment route"); 
    console.log(req.body);
    var newcomment = new Comment(req.body); 
    console.log(newcomment); 
    newcomment.save(function(err, post) { 
      if(err) {console.log("Save error");}
      else {
        console.log("Save worked");
        console.log(post);
        res.sendStatus(200);  
      }
    });
});

/* GET comments from database */
router.get('/comment', function(req, res, next) {
    console.log("In the GET route?");
    Comment.find(function(err,commentList) { //Calls the find() method on your database
      if (err) return console.error(err); //If there's an error, print it out
      else {
        console.log(commentList); //Otherwise console log the comments you found
        res.json(commentList); //Then send the comments
      }
    })
});


module.exports = router;