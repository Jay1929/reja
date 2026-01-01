console.log("Web Serverni boshlash");
const express = require("express");
const res = require("express/lib/response");
const app = express();

// const fs = require("fs");

// Mongo DB chaqirish
const db = require("./server").db();

// let user;
// fs.readFile("database/user.json", "utf8", (err, data) => {
//   if(err) {
//     console.log("ERROR:", err);
//   } else {
//     user = JSON.parse(data)
//   }  
// });

// 1: Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true })); 
 
// 2: Session code  
// 3: Views code 
app.set("views", "views"); 
app.set("view engine", "ejs");  

// 4: Routing
// app.get("/", function (req, res) {
//   res.end(`<h1 style="background: red">HELLO WORLD by JAY</h1>`);
// });          

// app.get("/hello", function (req, res) {
 
//   res.end("Salom");     
// });    
  
// app.get("/gift", function (req, res) {
//   res.end("Siz sovgalar sahifasidasiz");  
// });
app.post("/create-item", (req, res) => {
  console.log("user entered /create-item"); 
    console.log(req.body);
    const new_reja = req.body.reja;
    db.collection("plans").insertOne({reja: new_reja}, (err, data) => {
      console.log(data.ops);
      res.json(data.ops[0]);
    });
    // res.json({test: "succes"});  
});   
// app.get("/author", (req, res) => {
//   res.render("author", {user: user}); 
// }); 
// app.get("/", (req, res) => { 
//   res.redirect("/author");
// });

app.get("/", function (req, res) { 
  console.log('user entered /');
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        res.end("something went wrong"); 
      }   else {
        console.log(data);  
        res.render("reja", {items: data });
      }    
    });
});  
  
module.exports = app;
 