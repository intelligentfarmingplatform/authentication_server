const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //validate before register
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  //checking if the user is already in the database
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(400).json("Username already exists");
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).json("Email already exists");

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create a New User

  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      id_card: req.body.id_card,
    });
    await user.save();
    return res.json("Register Successfully !");
    //res.send({user: user._id});
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  //checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .json({ success: false, message: "Email or password is wrong !!" });
  //password is correct ??
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res
      .status(400)
      .json({ success: false, message: "Invalid password !" });

  //Create and assign a token
  const token = jwt.sign({ _id: user._id , email: user.email, username: user.username, CreatedAt: user.createdAt , UpdatedAt: user.UpdatedAt}, process.env.TOKEN_SECRET, {
    expiresIn: '7d', 
  });
  // res.json({
  //   'auth-token':token
  // });
  res
    .header("auth-token", token)
    .json({ success: true, email: user.email, "auth-token": token });
});

//router.post('/login')

module.exports = router;
