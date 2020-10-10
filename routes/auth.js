const router = require("express").Router();
const User = require("../model/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation , loginValidation} = require('../validation')


router.post("/register", async (req, res) => {
  //validate before register
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the user is already in the database
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send('Email already exists');

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password,salt);

  //Create a New User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });
  try {
    const savedUser = await user.save();
    //res.json({accessToken});
    //res.send({user: user._id});
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN
router.post('/login',async(req,res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //checking if the email exists
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send({success: false, message: 'Email or password is wrong !!'});
    //password is correct ??
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send({success: false, message:'Invalid password !'});

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    // res.json({
    //   'auth-token':token
    // });
    res.header('auth-token', token).send({success: true,email: user.email,'auth-token': token});
    




});

//router.post('/login')

module.exports = router;
