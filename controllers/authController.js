const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  console.log("loginUser");
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({
        status: 'fail',
        message: 'User not found',
      });
    }else{
      bcrypt.compare(password, user.password, (err, same)=>{
        if(same){
          //USer session
          res.status(200).send("User logged in successfully");
        }
      });
    }
  }catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};