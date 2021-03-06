var mongoose=require('mongoose');
var validator=require('validator');
const jwt=require('jsonwebtoken');
var UserSchema=new mongoose.Schema({

  email:{
    type:String,
    required:true,
    trim:true,
    minlength:5,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:'{VALUE} is not valid'
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});

UserSchema.methods.generateAuthToken=function(){
  var user = this;
  var access ='auth';
  var token=jwt.sign({_id:user._id.toHexString(),acess},'chandru').toString();

  user.tokens.push({access,token});

  return user.save().then(()=>{
    return token;
  });
}
var User=mongoose.model('User',UserSchema);

module.exports={
  User
};
