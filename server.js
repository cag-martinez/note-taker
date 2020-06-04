var express = require('express');
//var http = require("http");
//var serveStatic = require('serve-static');
var app = express();
var PORT = process.env.PORT || 7070;
var path = require("path");
//var http = require("http");
var fs = require('fs');
var notesObj = [];
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// html

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"))
    
})
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"))
})


//api

app.get("/api/notes", function(req, res){
    fs.readFile("db.json", function(err, data){
        if (err) throw err;
        res.json(JSON.parse(data));
    });
})


app.post("/api/notes", function(req, res){
    var newNote = req.body;

    req.body.id = Date.now().toString();

    notesObj.push(newNote);
    
    fs.writeFile("db.json", JSON.stringify(notesObj), function(err){
       if(err) throw err;
        console.log("You have posted note.");
    })
    res.json(newNote); 
}); 


app.delete("api/notes/:id", function(req, res){
    var notesId = parseInt(req.params.id);
    var removed = data.splice(notesId, 1);
    
    
    fs.writeFile("db.json", JSON.stringify(removed), function(err){
        if (err) throw err;
        console.log("You have deleted note.")
    });
   

    res.end();
}) 


// var server = http.createServer(handleRequest);

// function handleRequest(request, response) {
//     var path = request.url

//     switch (path) {
//         case "/notes":
//             return fs.readFile(__dirname + "/notes.html", function(err, html) {
//                 //app.get("/notes", express.static('public'));
//                 console.log("its working")
//                 response.writeHead(200, {"Content-Type": "text/html"});
//                 response.end(html);
//             });
//         default:
//             return fs.readFile(__dirname + "index.html", function(err, html) {
//                 //app.get("*", express.static('public'));
//                 console.log("its working")
//                 response.writeHead(200, {"Content-Type": "text/html"});
//                 response.end(html);
//             });
//     }
// }





// app.listen(7000, function() {
//     console.log("App listening on PORT " + PORT);
//   });

app.listen(7070, function() {
    console.log("App listening on PORT " + PORT);
  });