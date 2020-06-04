var express = require('express');
// var http = require("http");
//var serveStatic = require('serve-static');
var app = express();
// var fs = require('fs');
var PORT = process.env.PORT || 7000;

var http = require("http");
var fs = require('fs');


app.use(express.static('public'));
app.use(express.static('images'));

//server

app.get("/notes", function(request, respond){
    respond.send("notes is working");
})
app.get("/index", function(request, respond){
    respond.send("index is working")
})

var server = http.createServer(handleRequest);

function handleRequest(request, response) {
    var path = request.url

    switch (path) {
        case "/notes":
            return fs.readFile(__dirname + "/notes.html", function(err, html) {
                //app.get("/notes", express.static('public'));
                console.log("its working")
                response.writeHead(200, {"Content-Type": "text/html"});
                response.end(html);
            });
        default:
            return fs.readFile(__dirname + "index.html", function(err, html) {
                //app.get("*", express.static('public'));
                console.log("its working")
                response.writeHead(200, {"Content-Type": "text/html"});
                response.end(html);
            });
    }
}



server.listen(7000, function() {
    console.log("App listening on PORT " + PORT);
  });

app.listen(7000, function() {
    console.log("App listening on PORT " + PORT);
  });