var Hapi = require('hapi');
var MySQL = require('mysql');

let args = process.argv.slice(2);
let msquser = "";
let msqpass = "";
var server = new Hapi.Server();

var connection = MySQL.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     
});

server.connection({
    host: 'localhost',
    port: 3000
});



connection.connect(err => {
    if (err) {
        console.log("error",err.message);
        process.exit(1);
    }
    console.log("Connected ")
});

connection.query("show databases",function(err,results,field) {
    if (err) {
        console.log("Error",err.message);
        process.exit(1);
    }
    var database = results.find(o => o.Database == 'mailbo');
    console.log(database);
    if (database != null && database!= undefined && database['Database'] != null) {
        console.log(database);
        

    } else {
        
        connection.query("create database mailbo",function(er,res,f) {
            if (err) {
                console.log("db created",er)
               
                process.exit(1);
            }
        });
    }
    connection.query("use mailbox",function(er,res,f) {
        if (er) {
            console.log("error usage")
        }
        else
        {
         connection.query(" create table user (username VARCHAR(200)NOT NULL PRIMARY KEY, password VARCHAR(200)T NULL, email VARCHAR(50) NOT NULL UNIQUE)",function(er,res,f) {
            if (err) {
                console.log("db created",er)
                process.exit(1);
            }
        });}
    })
});




server.start(function(){
console.log("server")});