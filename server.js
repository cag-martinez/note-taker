var express = require('express');
var app = express();
var PORT = process.env.PORT || 7070;
var path = require("path");
//var http = require("http");
var fs = require('fs');
var notesObj = require('./db.json'); 
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
        res.json(notesObj);
})
app.post("/api/notes", function(req, res){
    var newNote = req.body;
    req.body.id = Date.now();
    notesObj.push(newNote);
    
    fs.writeFile("db.json", JSON.stringify(notesObj), function(err){
       if(err) throw err;
        console.log("Note added.");
    })
    res.json(newNote); 
}); 


app.delete("/api/notes/:id", function(req, res){
    

    for (let i = 0; i < notesObj.length; i++) {
        
       
        if(notesObj[i].id === parseInt(req.params.id)) {
            
            notesObj.splice(i, 1) 
        }
    }
    
    fs.writeFile("db.json", JSON.stringify(notesObj), function(err){
        if (err) throw err;

        console.log("Note deleted.")
        res.sendStatus(200)
    });
  
}) 

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });