const express = require("express");
const router = express.Router();
const multer = require("multer");
//load Profile Schema Model;
const Profile = require("../../Model/Profile");
const {storage} = require("../../config/multer");
//@ http method GET
//@description its profile get information
//@access PUBLIC

var upload = multer({
  storage
})

router.get("/", (req, res) => {
  res.send("i am profile router");
});

router.get("/create-profile", (req, res) => {
  res.render("./profiles/create-profile");
});

// @http method POST
// @description CREATE PROFILE DATA
// @access PRIVATE



router.post("/create-profile",upload.single("photo") ,(req, res) => {
  let {
    firstname,
    lastname,
    phone,
    address,
    alt_address,
    gender,
    country,
    pincode,
    landmark,
  } = req.body;
  let newProfile = {
   photo:req.file,
    firstname,
    lastname,
    phone,
    address,
    alt_address,
    gender,
    country,
    pincode,
    landmark,
  };

  new Profile(newProfile)
    .save()
    .then((profile) => {
      res.redirect("/profile", 201, { profile });
      console.log(profile);
    })
    .catch((err) => console.log(err));

   
});

module.exports = router;