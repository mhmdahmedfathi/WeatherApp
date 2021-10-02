// Setup empty JS object to act as endpoint for all routes
projectData = {};

const bodyParser = require('body-parser')
const cors = require('cors')
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

app.listen(3000, () => {
    console.log(`Server listening at port 3000`);
  });



  app.post('/data',(res)=>{

    projectData.temp = res.body.main.temp;
    projectData.date = res.body.Date;
    projectData.UserInput = res.body.input;
 
  })

  app.get('/retrive',(req,res)=>{
    res.json({projectData})
  })