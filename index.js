var express=require('express');
var bodyParser=require('body-parser');
var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todos');
var {User}=require('./models/users');
var {ObjectId}=require('mongodb');
var app = express();
var _=require('lodash');
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

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos:todos});
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectId.isValid(id)){
    return res.status(404).send({message:'Not Valid Id'});
  }
  Todo.findOne({_id:req.params.id}).then((todo)=>{
    res.send({todo:todo});
  },(e)=>{
    res.status(400).send(e);
  });
});
app.delete('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectId.isValid(id)){
    return res.status(404).send({message:'Not Valid Id'});
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(400).send({message:'Not a valid id'});
    }
    res.send({todo:todo});
  }).catch((e)=>{
    res.status(400).send(e);
  });
});

app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectId.isValid(id)){
    return res.status(404).send({message:'Not Valid Id'});
  }
  if(_.isBoolean(req.body.completed)&&req.body.completed){
    req.body.completedAt=new Date().getTime();
  }else{
    req.body.completed=false;
    req.body.completedAt=null;
  }

  Todo.findByIdAndUpdate(id,{$set:req.body},{new:true}).then((todo)=>{
    if(!todo){
       return res.status(404).send('dn');
    }
    res.send({todo:todo});
  }).catch((e)=>{
     res.status(404).send();
  });
});

//POST
app.post('/users',(req,res)=>{
  var body=_.pick(req.body,['email','password']);
  var user= new User(body);

  //MOdule methods--Custom module methods
  //Instance Methods
  user.save().then(()=>{
    return user.generateAuthToken();
    // res.send(user);
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  })
});
app.listen(3000,(err,res)=>{
  if(!err){
    console.log('app is running at port:3000');
  }
});
