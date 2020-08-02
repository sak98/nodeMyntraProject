//mongodb+srv://Arun:1234567890@cluster0.fdeko.mongodb.net/Arun?retryWrites=true&w=majority

//import modules 
const express = require("express");
const {connect} = require("mongoose");
const app = express();
const exphbs = require("express-handlebars");
const {PORT,MONGODB_URL} = require("./config");
const bodyParser = require("body-parser");

//template engine statrs here
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
//tempplate ingine ends here 

//body parser incomming req
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// serve static assets 
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules"));


//mongodb database connection 
connect(MONGODB_URL,{useUnifiedTopology:true,useNewUrlParser:true},(err)=>{
    if (err) throw err
    console.log("Database Connection successfully established");
})
//routing
app.get("/",(req,res)=>{
    res.render("./home")
})
app.use("/profile/", require("./Routes/profiles/profile"));
app.use("/auth/", require("./Routes/auth/auth"));



//port listen function 

app.listen(PORT,(err)=>{
    if(err) throw err
    console.log("Myntra is running on port"+PORT);
})

