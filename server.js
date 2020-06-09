var express = require('express');
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

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });