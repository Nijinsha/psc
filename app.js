var express = require('express');
var app = express();
var mongoose = require('mongoose');
var question = require('./models/question.js');
var bodyParser =require('body-parser');


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/psc', function (error) {
    if (error) {
        console.log(error);
    }
});


app.get("/",function(req,res){
    res.send("please go to /api");
    res.end;
});
app.get('/api',function(req,res){
    question.count().exec(function (err, count) {

  // Get a random entry
  var random = Math.floor(Math.random() * count)

  // Again query all users but only fetch one offset by our random #
  question.findOne().skip(random).exec(
    function (err, result) {
      // Tada! random user
      res.json(result); 
    })
})
});


app.get('/in',function(req,res){
    res.render("input");
});
app.post('/in',function(req,res){
    var intoquestion = new question({
        question: req.body.question,
        1     : req.body.op1,
        2     : req.body.op2,
        3     : req.body.op3,
        4     : req.body.op4,
        ans   : req.body.answer        
    });
    intoquestion.save(function(err,datas){
        if(!err){
         console.log("done");
         
         return res.redirect('/in');       
                 
      }
        console.log(err);
        

    });
});




app.listen(3000,function(){
    console.log("api running at port 3000");
});
