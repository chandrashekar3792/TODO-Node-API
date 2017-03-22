var express=require('express');
var bodyParser=require('body-parser');
var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todos');
var {User}=require('./models/users');

var app = express();
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  console.log(req.body);
  var todo= new Todo({
    text:req.body.text
  });
todo.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.send(e);
  });
});

app.listen(3000,(err,res)=>{
  if(!err){
    console.log('app is running at port:3000');
  }
});
