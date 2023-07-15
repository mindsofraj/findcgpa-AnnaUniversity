"use strict";

//Requiring the modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
require("dotenv").config();

const calculateGpa = require("./calculateGpa");
const calculateGpa10 = require("./calculateGpa10");
const memeImageChecker = require("./memeImageChecker");



const app = express();

//View Enginer Setup
app.set('view engine', 'ejs');

//Middle Ware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

//Static folder
app.use(express.static(__dirname + "/public"));

//Initializing Global Variables
let resultGpa = 0;
let semFromRequestedTitle = 0;
let deptFromRequestedTitle = "";
let department = "";
let semester = 0;

//<---Home Page--->
app.get("/", (req, res) => {
  res.render("index");
})

app.post("/", (req, res) => {
  department = req.body.department;
  semester = Number(req.body.semester);

  switch(department) {
    case "computerScience": {
      res.redirect(`/cse-sem${semester}`);
      break;
    }
    case "mechanical": {
      res.redirect(`/mech-sem${semester}`);
      break;
    }
    case "electrical": {
      res.redirect(`/eee-sem${semester}`);
      break;
    }
    case "electronicsAndCommunication": {
      res.redirect(`/ece-sem${semester}`);
      break;
    }
    case "civil": {
      res.redirect(`/civil-sem${semester}`);
      break;
    }
  }


  // Contact Backend
  if((req.body.name)) {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    })
    console.log(req.body.name);
    const mailOptions = {
      from: "fingCGPA.com USER",
      to: process.env.EMAIL,
      subject:"Message From findCGPA.com User",
      html: `<h2 style="color: rgb(255, 166, 0)">You have a new contact request!</h2>
      <h3 style="color:rgb(245, 222, 179)">CONTACT DETAILS</h3>
          <h4>Name: ${req.body.name}</h4>
          <h4>Email: ${req.body.email}</h4>
      <hr>
      <br>
      <h3 style="color: rgb(0, 234, 255);">MESSAGE</h3>
      <p>${req.body.message}</p>
      `
    }
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send("Error");
      }else {
        console.log("Email Sent" + info.response);
        res.send("Success");
      }
    })
  }
})

//Avoiding favicon.ico route by send HTTP 204 No Content success status response code
app.get('/favicon.ico', function(req, res) { 
  res.sendStatus(204); 
});
//Avoiding script.js route by send HTTP 204 No Content success status response code
app.get('/script.js', function(req, res) { 
  res.sendStatus(204); 
});



app.get('/:id', function(req, res, next) {
  const title = req.params.id;    
  const requestedTitle = title.toLowerCase();
  const requestedTitleWithoutSem = requestedTitle.substring(0, requestedTitle.length - 1);
  const semString = requestedTitle.substring(requestedTitle.length - 4, requestedTitle.length - 1);

  // Check if the requestedTitle containes the string "sem",
  // if yes then gets the last character as Semester and first word as Department...
  if ( semString === "sem" ) {
    let deptName =  requestedTitle.substring(0, requestedTitle.length - 5);
    let lastChar = Number(requestedTitle.charAt(requestedTitle.length - 1));
    if (lastChar < 9) {
      semFromRequestedTitle = lastChar;
      deptFromRequestedTitle = deptName.toUpperCase();
    }
  }
  const memeNumber = memeImageChecker(resultGpa, semFromRequestedTitle);

  // Check if requestedTitle contains the string results,
  // if yes then renders the results page else renders the requested page...
  if (requestedTitle === "results") {
    res.render("results", {result: resultGpa, sem: semFromRequestedTitle, dept: deptFromRequestedTitle, memeNumber: memeNumber});
  }else {
    switch(requestedTitleWithoutSem){
      case "cse-sem": 
        res.render(`CSE/${requestedTitle}`, {dept: deptFromRequestedTitle, sem: semFromRequestedTitle});
        break;
      case "mech-sem":
        res.render(`MECH/${requestedTitle}`, {dept: deptFromRequestedTitle, sem: semFromRequestedTitle});
        break;
      case "eee-sem":
        res.render(`EEE/${requestedTitle}`, {dept: deptFromRequestedTitle, sem: semFromRequestedTitle});
        break;
        case "ece-sem":
          res.render(`ECE/${requestedTitle}`, {dept: deptFromRequestedTitle, sem: semFromRequestedTitle});
          break;
        case "civil-sem":
          res.render(`CIVIL/${requestedTitle}`, {dept: deptFromRequestedTitle, sem: semFromRequestedTitle});
          break;
    }
  }
  next();
});

//COMPUTER SCIENCE DEPARTMENT

//CSE - Semester 1
app.post("/cse-sem1", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
  res.redirect("/results")
});

//CSE - Semester 2
app.post("/cse-sem2", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
  res.redirect("/results")
});

//CSE - Semester 3
app.post("/cse-sem3", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8),
        creditSub9 = Number(req.body.credit9);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8,
        gradeSub9 = req.body.grade9;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9);
  res.redirect("/results")
});

//CSE - Semester 4
app.post("/cse-sem4", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8),
        creditSub9 = Number(req.body.credit9);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8,
        gradeSub9 = req.body.grade9;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9);
  res.redirect("/results")
});


//CSE - Semester 5
app.post("/cse-sem5", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8),
        creditSub9 = Number(req.body.credit9);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8,
        gradeSub9 = req.body.grade9;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9);
  res.redirect("/results")
});

//CSE - Semester 6
app.post("/cse-sem6", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8),
        creditSub9 = Number(req.body.credit9),
        creditSub10 = Number(req.body.credit10);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8,
        gradeSub9 = req.body.grade9,
        gradeSub10 = req.body.grade10;

//Passing the params to calculteGpa function to calculate the GPA
resultGpa = calculateGpa10(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, creditSub10, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9, gradeSub10);
res.redirect("/results")
});

//CSE - Semester 7
app.post("/cse-sem7", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
  res.redirect("/results")
});

//CSE - Semester 8
app.post("/cse-sem8", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, 0, 0, 0, 0, 0, 0, gradeSub1, gradeSub2, gradeSub3, 0, 0, 0, 0, 0, 0);
  res.redirect("/results")
});

//MECHANICAL DEPARTMENT

//MECH - Semester 1
app.post("/mech-sem1", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
  res.redirect("/results")
});

//MECH - Semester 2
app.post("/mech-sem2", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
  res.redirect("/results")
});

//MECH - Semester 3
app.post("/mech-sem3", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8),
        creditSub9 = Number(req.body.credit9);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8,
        gradeSub9 = req.body.grade9;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9);
  res.redirect("/results")
});

//MECH - Semester 4
app.post("/mech-sem4", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8),
        creditSub9 = Number(req.body.credit9);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8,
        gradeSub9 = req.body.grade9;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9);
  res.redirect("/results")
});

//MECH - Semester 5
app.post("/mech-sem5", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
  res.redirect("/results")
});

//MECH - Semester 6
app.post("/mech-sem6", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8),
        creditSub9 = Number(req.body.credit9);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8,
        gradeSub9 = req.body.grade9;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9);
  res.redirect("/results")
});

//MECH - Semester 7
app.post("/mech-sem7", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8),
        creditSub9 = Number(req.body.credit9);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8,
        gradeSub9 = req.body.grade9;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9);
  res.redirect("/results")
});

//MECH - Semester 8
app.post("/mech-sem8", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3);

  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, 0, 0, 0, 0, 0, 0, gradeSub1, gradeSub2, gradeSub3, 0, 0, 0, 0, 0, 0);
  res.redirect("/results")
});

//ELECTRICAL DEPARTMENT

//EEE - Semester 1
app.post("/eee-sem1", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
  res.redirect("/results")
});

//EEE - Semester 2
app.post("/eee-sem2", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
  res.redirect("/results")
});

//EEE - Semester 3
app.post("/eee-sem3", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
  res.redirect("/results")
});

//EEE - Semester 4
app.post("/eee-sem4", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8),
        creditSub9 = Number(req.body.credit9);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8,
        gradeSub9 = req.body.grade9;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9);
  res.redirect("/results")
});

//EEE - Semester 5
app.post("/eee-sem5", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8),
        creditSub9 = Number(req.body.credit9);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8,
        gradeSub9 = req.body.grade9;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9);
  res.redirect("/results")
});

//EEE - Semester 6
app.post("/eee-sem6", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
  res.redirect("/results")
});

//EEE - Semester 7
app.post("/eee-sem7", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
  res.redirect("/results")
});

//EEE - Semester 8
app.post("/eee-sem8", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, 0, 0, 0, 0, 0, 0, gradeSub1, gradeSub2, gradeSub3, 0, 0, 0, 0, 0, 0);
  res.redirect("/results")
});

//ELECTRONICS AND COMMUNICATION DEPARTMENT

//ECE - Semester 1
app.post("/ece-sem1", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
  res.redirect("/results")
});

//ECE - Semester 2
app.post("/ece-sem2", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
  res.redirect("/results")
});

//ECE - Semester 3
app.post("/ece-sem3", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8),
        creditSub9 = Number(req.body.credit9);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8,
        gradeSub9 = req.body.grade9;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9);
  res.redirect("/results")
});

//ECE - Semester 4
app.post("/ece-sem4", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
  res.redirect("/results")
});

//ECE - Semester 5
app.post("/ece-sem5", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8),
        creditSub9 = Number(req.body.credit9);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8,
        gradeSub9 = req.body.grade9;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9);
  res.redirect("/results")
});

//ECE - Semester 6
app.post("/ece-sem6", function(req, res){
      //Declaring Credit Variables
      const creditSub1 = Number(req.body.credit1),
            creditSub2 = Number(req.body.credit2),
            creditSub3 = Number(req.body.credit3),
            creditSub4 = Number(req.body.credit4),
            creditSub5 = Number(req.body.credit5),
            creditSub6 = Number(req.body.credit6),
            creditSub7 = Number(req.body.credit7),
            creditSub8 = Number(req.body.credit8),
            creditSub9 = Number(req.body.credit9),
            creditSub10 = Number(req.body.credit10);
      
      //Declaring Grade varibales
      const gradeSub1 = req.body.grade1,
            gradeSub2 = req.body.grade2,
            gradeSub3 = req.body.grade3,
            gradeSub4 = req.body.grade4,
            gradeSub5 = req.body.grade5,
            gradeSub6 = req.body.grade6,
            gradeSub7 = req.body.grade7,
            gradeSub8 = req.body.grade8,
            gradeSub9 = req.body.grade9,
            gradeSub10 = req.body.grade10;
    
//Passing the params to calculteGpa function to calculate the GPA
resultGpa = calculateGpa10(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, creditSub10, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9, gradeSub10);
res.redirect("/results")
});

//ECE - Semester 7
app.post("/ece-sem7", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3),
        creditSub4 = Number(req.body.credit4),
        creditSub5 = Number(req.body.credit5),
        creditSub6 = Number(req.body.credit6),
        creditSub7 = Number(req.body.credit7),
        creditSub8 = Number(req.body.credit8);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3,
        gradeSub4 = req.body.grade4,
        gradeSub5 = req.body.grade5,
        gradeSub6 = req.body.grade6,
        gradeSub7 = req.body.grade7,
        gradeSub8 = req.body.grade8;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
  res.redirect("/results")
});

//ECE - Semester 8
app.post("/ece-sem8", function(req, res){
  //Declaring Credit Variables
  const creditSub1 = Number(req.body.credit1),
        creditSub2 = Number(req.body.credit2),
        creditSub3 = Number(req.body.credit3);
  
  //Declaring Grade varibales
  const gradeSub1 = req.body.grade1,
        gradeSub2 = req.body.grade2,
        gradeSub3 = req.body.grade3;

        //Passing the params to calculteGpa function to calculate the GPA
  resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, 0, 0, 0, 0, 0, 0, gradeSub1, gradeSub2, gradeSub3, 0, 0, 0, 0, 0, 0);
  res.redirect("/results")
});

//CIVIL ENGINEERING

//CIVIL - Semester 1
app.post("/civil-sem1", function(req, res){
      //Declaring Credit Variables
      const creditSub1 = Number(req.body.credit1),
            creditSub2 = Number(req.body.credit2),
            creditSub3 = Number(req.body.credit3),
            creditSub4 = Number(req.body.credit4),
            creditSub5 = Number(req.body.credit5),
            creditSub6 = Number(req.body.credit6),
            creditSub7 = Number(req.body.credit7),
            creditSub8 = Number(req.body.credit8);
      
      //Declaring Grade varibales
      const gradeSub1 = req.body.grade1,
            gradeSub2 = req.body.grade2,
            gradeSub3 = req.body.grade3,
            gradeSub4 = req.body.grade4,
            gradeSub5 = req.body.grade5,
            gradeSub6 = req.body.grade6,
            gradeSub7 = req.body.grade7,
            gradeSub8 = req.body.grade8;
    
            //Passing the params to calculteGpa function to calculate the GPA
      resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
      res.redirect("/results")
});

//CIVIL - Semester 2
app.post("/civil-sem2", function(req, res){
      //Declaring Credit Variables
      const creditSub1 = Number(req.body.credit1),
            creditSub2 = Number(req.body.credit2),
            creditSub3 = Number(req.body.credit3),
            creditSub4 = Number(req.body.credit4),
            creditSub5 = Number(req.body.credit5),
            creditSub6 = Number(req.body.credit6),
            creditSub7 = Number(req.body.credit7),
            creditSub8 = Number(req.body.credit8);
      
      //Declaring Grade varibales
      const gradeSub1 = req.body.grade1,
            gradeSub2 = req.body.grade2,
            gradeSub3 = req.body.grade3,
            gradeSub4 = req.body.grade4,
            gradeSub5 = req.body.grade5,
            gradeSub6 = req.body.grade6,
            gradeSub7 = req.body.grade7,
            gradeSub8 = req.body.grade8;
    
            //Passing the params to calculteGpa function to calculate the GPA
      resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, 0);
      res.redirect("/results")
});

//CIVIL - Semester 3
app.post("/civil-sem3", function(req, res){
      //Declaring Credit Variables
      const creditSub1 = Number(req.body.credit1),
            creditSub2 = Number(req.body.credit2),
            creditSub3 = Number(req.body.credit3),
            creditSub4 = Number(req.body.credit4),
            creditSub5 = Number(req.body.credit5),
            creditSub6 = Number(req.body.credit6),
            creditSub7 = Number(req.body.credit7),
            creditSub8 = Number(req.body.credit8),
            creditSub9 = Number(req.body.credit9);
      
      //Declaring Grade varibales
      const gradeSub1 = req.body.grade1,
            gradeSub2 = req.body.grade2,
            gradeSub3 = req.body.grade3,
            gradeSub4 = req.body.grade4,
            gradeSub5 = req.body.grade5,
            gradeSub6 = req.body.grade6,
            gradeSub7 = req.body.grade7,
            gradeSub8 = req.body.grade8,
            gradeSub9 = req.body.grade9;
    
            //Passing the params to calculteGpa function to calculate the GPA
      resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9);
      res.redirect("/results")
});

//CIVIL - Semester 4
app.post("/civil-sem4", function(req, res){
      //Declaring Credit Variables
      const creditSub1 = Number(req.body.credit1),
            creditSub2 = Number(req.body.credit2),
            creditSub3 = Number(req.body.credit3),
            creditSub4 = Number(req.body.credit4),
            creditSub5 = Number(req.body.credit5),
            creditSub6 = Number(req.body.credit6),
            creditSub7 = Number(req.body.credit7),
            creditSub8 = Number(req.body.credit8),
            creditSub9 = Number(req.body.credit9);
      
      //Declaring Grade varibales
      const gradeSub1 = req.body.grade1,
            gradeSub2 = req.body.grade2,
            gradeSub3 = req.body.grade3,
            gradeSub4 = req.body.grade4,
            gradeSub5 = req.body.grade5,
            gradeSub6 = req.body.grade6,
            gradeSub7 = req.body.grade7,
            gradeSub8 = req.body.grade8,
            gradeSub9 = req.body.grade9;
    
            //Passing the params to calculteGpa function to calculate the GPA
      resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9);
      res.redirect("/results")
});

//CIVIL - Semester 5
app.post("/civil-sem5", function(req, res){
      //Declaring Credit Variables
      const creditSub1 = Number(req.body.credit1),
            creditSub2 = Number(req.body.credit2),
            creditSub3 = Number(req.body.credit3),
            creditSub4 = Number(req.body.credit4),
            creditSub5 = Number(req.body.credit5),
            creditSub6 = Number(req.body.credit6),
            creditSub7 = Number(req.body.credit7),
            creditSub8 = Number(req.body.credit8),
            creditSub9 = Number(req.body.credit9);
      
      //Declaring Grade varibales
      const gradeSub1 = req.body.grade1,
            gradeSub2 = req.body.grade2,
            gradeSub3 = req.body.grade3,
            gradeSub4 = req.body.grade4,
            gradeSub5 = req.body.grade5,
            gradeSub6 = req.body.grade6,
            gradeSub7 = req.body.grade7,
            gradeSub8 = req.body.grade8,
            gradeSub9 = req.body.grade9;
    
            //Passing the params to calculteGpa function to calculate the GPA
      resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9);
      res.redirect("/results")
});

//CIVIL - Semester 6
app.post("/civil-sem6", function(req, res){
      //Declaring Credit Variables
      const creditSub1 = Number(req.body.credit1),
            creditSub2 = Number(req.body.credit2),
            creditSub3 = Number(req.body.credit3),
            creditSub4 = Number(req.body.credit4),
            creditSub5 = Number(req.body.credit5),
            creditSub6 = Number(req.body.credit6),
            creditSub7 = Number(req.body.credit7),
            creditSub8 = Number(req.body.credit8),
            creditSub9 = Number(req.body.credit9);
      
      //Declaring Grade varibales
      const gradeSub1 = req.body.grade1,
            gradeSub2 = req.body.grade2,
            gradeSub3 = req.body.grade3,
            gradeSub4 = req.body.grade4,
            gradeSub5 = req.body.grade5,
            gradeSub6 = req.body.grade6,
            gradeSub7 = req.body.grade7,
            gradeSub8 = req.body.grade8,
            gradeSub9 = req.body.grade9;
    
            //Passing the params to calculteGpa function to calculate the GPA
      resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, creditSub8, creditSub9, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, gradeSub8, gradeSub9);
      res.redirect("/results")
});

//CIVIL - Semester 7
app.post("/civil-sem7", function(req, res){
      //Declaring Credit Variables
      const creditSub1 = Number(req.body.credit1),
            creditSub2 = Number(req.body.credit2),
            creditSub3 = Number(req.body.credit3),
            creditSub4 = Number(req.body.credit4),
            creditSub5 = Number(req.body.credit5),
            creditSub6 = Number(req.body.credit6),
            creditSub7 = Number(req.body.credit7);    
      
      //Declaring Grade varibales
      const gradeSub1 = req.body.grade1,
            gradeSub2 = req.body.grade2,
            gradeSub3 = req.body.grade3,
            gradeSub4 = req.body.grade4,
            gradeSub5 = req.body.grade5,
            gradeSub6 = req.body.grade6,
            gradeSub7 = req.body.grade7;
    
            //Passing the params to calculteGpa function to calculate the GPA
      resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, creditSub4, creditSub5, creditSub6, creditSub7, 0, 0, gradeSub1, gradeSub2, gradeSub3, gradeSub4, gradeSub5, gradeSub6, gradeSub7, 0, 0);
      res.redirect("/results")
});

//CIVIL - Semester 8
app.post("/civil-sem8", function(req, res){
      //Declaring Credit Variables
      const creditSub1 = Number(req.body.credit1),
            creditSub2 = Number(req.body.credit2),
            creditSub3 = Number(req.body.credit3);
      
      //Declaring Grade varibales
      const gradeSub1 = req.body.grade1,
            gradeSub2 = req.body.grade2,
            gradeSub3 = req.body.grade3;
    
            //Passing the params to calculteGpa function to calculate the GPA
      resultGpa = calculateGpa(creditSub1, creditSub2, creditSub3, 0, 0, 0, 0, 0, 0, gradeSub1, gradeSub2, gradeSub3, 0, 0, 0, 0, 0, 0);
      res.redirect("/results")
});
    

// //<---Results Page--->
app.post("/results", (req, res) => {
  res.redirect("/");
})

// app.post("/detailedResults", (req, res) => {
//     res.render("detailedResults")
// })



// <---Error Page--->
app.post("/404", (req, res) => {
  res.redirect("/");
})


//Catching Error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("404")
})




//Listening the app on port 3000
app.listen(process.env.PORT || 3000, function() { 
 console.log('Started listening on port 3000!');    
});
