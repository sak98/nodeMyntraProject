const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const flash = require("flash");
//load auth model
let User = require("../../Model/auth");
//login part get route
router.get("/login", (req, res) => {
  res.render("./auth/login");
});
//register part get route
router.get("/register", (req, res) => {
  res.render("./auth/register");
});

//@ http method POST
router.post("/register", (req, res) => {
  //server side validation
  const errors = [];
  let { username, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not mathch" });
  }
  if (password.length < 6) {
    errors.push({ text: "Passwords must have minimum of 6 characters" });
  }
  if (errors.length > 0) {
    res.render("./auth/register", {
      errors,
      username,
      password,
      confirm_password,
    });
    res.send(errors);
  } else {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          
          res.redirect("/auth/register", 401, {});
        } else {
          let newUser = new User({
            username,
            email,
            password,
          });
          //make password hashed 
          bcrypt.genSalt(12,(err,salt)=>{
            if(err)throw err;
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
              if(err)throw err
              newUser.password = hash;
              newUser.save().then(user=>{
                res.send("Data updated ")
              }).catch(err=>console.log(err))
            })
          });
          //hashing ends here

        }
      })
      .catch((err) => console.log(err));
  }
});

module.exports = router;
