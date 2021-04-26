const express = require('express')
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser')

const app = express() 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(express.static('public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const port = 3000 

var url = "mongodb://localhost:27017/mydb";



app.post('/registeruser', function (req, response) {
    console.log(req.body);
    var fnameValue = req.body.name;
    var lnameValue = req.body.namel;
    var ageValue = req.body.age1;
    var phoneValue = req.body.phone1;
    var emailValue = req.body.mail;
    var passValue = req.body.password;
    var data = { result : "default"};
    //Validate 
        if( emailValue == ""|| passValue == ""){
            response.statusCode = 404;
            data = { result : "empty values : failed"};
            console.log("empty values failed"); 
            response.send(data)
        }else {
            MongoClient.connect(url, {useNewUrlParser:true }, function(err, db) {
                if (err){
                    response.statusCode = 404;
                    data = { result : "Connection failed"};
                    console.log("Connection failed");
                    response.send(data)
                }else {
                    var dbo = db.db("mydb");
                    var myobj = {
                      firstname: fnameValue,
                      lastname: lnameValue,
                      age: ageValue,
                      phone: phoneValue,
                      email: emailValue,
                      password: passValue,
                    };  
                    dbo.collection("user").insertOne(myobj, function(err, res) 
                    {
                        if (err){
                            response.statusCode = 404;
                            console.log("user registration failed");   
                            data = { result : "user registration failed"};
                            response.send(data)
                        }else {  
                            console.log("1 user inserted");   
                            db.close();
                            response.statusCode = 200;
                            data = { result : "Registration DONE"} ;
                            response.send(data)
                        }
                    });                    

                }
            }); 

        }         
  });

  app.get('/login', (req, response) => {
    var emailValue = req.query.email;
    var passValue = req.query.pass;
    var data = { result : "default"};

    if(emailValue=="" || passValue=="")
    {
        response.statusCode = 404;
            data = { result : "empty values : failed"};
            console.log("empty values failed"); 
            response.send(data)
    }
    else{
        MongoClient.connect(url, {useNewUrlParser:true }, function(err, db) {
            if (err){
                response.statusCode = 404;
                data = { result : "Connection failed"};
                console.log("Connection failed");
                response.send(data)
            }else {
                var dbo = db.db("mydb");
                var myobj = { email:emailValue,password:passValue};  
                dbo.collection("user").findOne(myobj, function(err, res) 
                {
                    if (err){
                        response.statusCode = 404;
                        console.log("Login failed");   
                        data = { result : "Login failed"};
                        response.send(data);
                    }else {     
                        db.close();
                        //response.statusCode = 200;
                        data = { result : "Login DONE"} ;
                        response.status(200).send(res);
                    }
                });                    

            }
        });
    }
  })

  app.post('/updateuser', function (req, response) {
    var fnameValue = req.body.name;
    var lnameValue = req.body.namel;
    var ageValue = req.body.age1;
    var phoneValue = req.body.phone1;
    var emailValue = req.body.mail;
    var data = { result : "default"};
    //Validate 
        if( emailValue == ""|| lnameValue == ""){
            response.statusCode = 404;
            data = { result : "empty values : failed"};
            console.log("empty values failed"); 
            response.send(data)
        }else {
            MongoClient.connect(url, {useNewUrlParser:true }, function(err, db) {
                if (err){
                    response.statusCode = 404;
                    data = { result : "Connection failed"};
                    console.log("Connection failed");
                    response.send(data)
                }else {
                    var dbo = db.db("mydb");
                    var myquery = { email: emailValue };
                    var myobj = {
                      $set: {
                        firstname: fnameValue,
                        lastname: lnameValue,
                        age: ageValue,
                        phone: phoneValue,
                        email: emailValue,
                      },
                    };  
                    dbo.collection("user").updateOne(myquery, myobj, function(err, res) 
                    {
                        if (err){
                            response.statusCode = 404;
                            console.log("user updation failed");   
                            data = { result : "user updation failed"};
                            response.send(data)
                        }else {  
                            console.log("1 user updated");   
                            db.close();
                            response.statusCode = 200;
                            data = { result : "DONE"} ;
                            response.send(data)
                        }
                    });                    

                }
            }); 

        }         
  });

  app.post('/updateuser', function (req, response) {
    var fnameValue = req.body.name;
    var lnameValue = req.body.namel;
    var ageValue = req.body.age;
    var phoneValue = req.body.phone;
    var emailValue = req.body.mail;
    var data = { result : "default"};
    //Validate 
        if( emailValue == ""|| lnameValue == ""){
            response.statusCode = 404;
            data = { result : "empty values : failed"};
            console.log("empty values failed"); 
            response.send(data)
        }else {
            MongoClient.connect(url, {useNewUrlParser:true }, function(err, db) {
                if (err){
                    response.statusCode = 404;
                    data = { result : "Connection failed"};
                    console.log("Connection failed");
                    response.send(data)
                }else {
                    var dbo = db.db("mydb");
                    var myquery = { email: emailValue };
                    var myobj = {
                      $set: {
                        firstname: fnameValue,
                        lastname: lnameValue,
                        age: ageValue,
                        phone: phoneValue,
                        email: emailValue,
                      },
                    };  
                    dbo.collection("user").updateOne(myquery, myobj, function(err, res) 
                    {
                        if (err){
                            response.statusCode = 404;
                            console.log("user updation failed");   
                            data = { result : "user updation failed"};
                            response.send(data)
                        }else {  
                            console.log("1 user updated");   
                            db.close();
                            response.statusCode = 200;
                            data = { result : "DONE"} ;
                            response.send(data)
                        }
                    });                    

                }
            }); 

        }         
  });

  app.post('/saveitem', function (req, response) {
    var itemName = req.body.item;
    var quant = req.body.quantity;
    var prc = req.body.price;
    var data = { result : "default"};

            MongoClient.connect(url, {useNewUrlParser:true }, function(err, db) {
                if (err){
                    response.statusCode = 404;
                    data = { result : "Connection failed"};
                    console.log("Connection failed");
                    response.send(data)
                }else {
                    var dbo = db.db("mydb");
                    var myobj = {itemname:itemName, quantity:quant,price:prc};  
                    dbo.collection("items").insertOne(myobj, function(err, res) 
                    {
                        if (err){
                            response.statusCode = 404;   
                            data = { result : "failed"};
                            response.send(data)
                        }else {    
                            db.close();
                            response.statusCode = 200;
                            data = { result : "DONE"} ;
                            response.send(data)
                        }
                    });                 

                }
            });               
  });

  app.get('/getitems', function (req, response) {

         MongoClient.connect(url, {useNewUrlParser:true }, function(err, db) {
            var dbo = db.db("mydb");
            var coll = dbo.collection('items');

            coll.find({}).toArray(function (err, result) {
                if (err) {
                    response.send(err);
                } else {
        
                    response.send(result);
                }
            })
        });               
  });

  app.listen(port, () => {    
      console.log(`Example app listening at http://localhost:${port}`)  
    })