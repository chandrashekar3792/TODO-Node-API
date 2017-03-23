var mongoose=require('mongoose');
var validator=require('validator');
var User=mongoose.model('User',{
  // {
  //   email:'chandrashekar998@gmail.com',
  //   password:'myPass123',
  //   tokens:[{
  //     access:'auth',
  //     token:'dddweddcedcfeeee'
  //   }]
  // },
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
  token:[{
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

module.exports={
  User
};
