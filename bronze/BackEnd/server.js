const http = require('http');
const { constants } = require('buffer');
const GET = 'GET';
const PUT = 'PUT';
const OPTIONS = 'OPTIONS';
const POST = 'POST';
const DELETE = 'DELETE';
const urlParser = require('url');
const mysql = require("mysql");
const { runInNewContext } = require('vm');
const express = require("express");
const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "andrewc1_bronze",
    password: "Andrewy1.",
    database: "andrewc1_Bronze"
});


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-type, Authorization, Content-Length, X-Request-Width");
    next();
});


app.post("/server/", (req, res) => {

    console.log("request is  = ");

    let body = "";

   req.on('data', function (chunk){
       console.log("chunk is "+ JSON.stringify(chunk));
       if(chunk !== null){
           body += chunk;
           console.log("body is =")
           console.log(JSON.stringify(body));

       }
   })
   
var message = 'Added to database! \n',
   version = 'NodeJS ' + process.versions.node + '\n',
   response = [message, version].join('\n');
   
   req.on('end', function(){
       let parsedBody = JSON.parse(body);
       console.log("body is = "+ JSON.parse(body));
   
       let index = parsedBody.id;
       let quote = parsedBody.body;
           console.log("parsed id is = " + parsedBody.id);
            console.log("parsed body is = " + parsedBody.body);
           
   
       
    db.query("REPLACE INTO FamousQuotes values ("+ index + ','+ quote + ')', function (err,result){
           if(err) throw err;
            console.log("1 record inserted");
       })
   })


   console.log("inside post")
})

app.delete("/server", (req, res) => {
    
    console.log("request is  = ");

    let body = "";

   req.on('data', function (chunk){
       console.log("chunk is "+ JSON.stringify(chunk));
       if(chunk !== null){
           body += chunk;
           console.log("body is =")
           console.log(JSON.stringify(body));

       }
   })
   
var message1 = 'deleted from database! \n',
   version1 = 'NodeJS ' + process.versions.node + '\n',
   response1 = [message1, version1].join('\n');
   
   req.on('end', function()
   {
       let parsedBody = JSON.parse(body);
       console.log("body is = "+ JSON.parse(body));
   
       let index = parsedBody.id;
       let quote = parsedBody.body;
           console.log("parsed id is = " + parsedBody.id);
            console.log("parsed body is = " + parsedBody.body);
           
   
       
    db.query("DELETE FROM FamousQuotes WHERE ( ID = "+ index + ')', function (err,result){
           if(err) throw err;
            console.log("1 record deleted");
       })

   })
   console.log("inside delete")
})

app.get("/server/", (req,res)=>{

        console.log("inside get");
    
        db.query("SELECT * FROM FamousQuotes", function (err, result) {
            if (err) throw err;
           res.send(result);
        })   
    })
app.put("/server/",(req,res)=>{
    console.log("request is  = ");

    let body = "";

   req.on('data', function (chunk){
       console.log("chunk is "+ JSON.stringify(chunk));
       if(chunk !== null){
           body += chunk;
           console.log("body is =")
           console.log(JSON.stringify(body));

       }
   })
   
var message = 'Added to database! \n',
   version = 'NodeJS ' + process.versions.node + '\n',
   response = [message, version].join('\n');
   
   req.on('end', function(){
       let parsedBody = JSON.parse(body);
       console.log("body is = "+ JSON.parse(body));
   
       let index = parsedBody.id;
       let quote = parsedBody.body;
           console.log("parsed id is = " + parsedBody.id);
            console.log("parsed body is = " + parsedBody.body);
           
   
       
    db.query("REPLACE INTO FamousQuotes values ("+ index + ','+ quote + ')', function (err,result){
           if(err) throw err;
            console.log("1 record inserted");
       })
   })


   console.log("inside put")
})

app.listen();