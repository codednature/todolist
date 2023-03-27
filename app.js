

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();


const Items =[];
const workItems = [];


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get("/", function(req, res) {    
    const day = date.getDate();
    res.render("List", {listTitle: day, newListItems: Items
    });
});



app.post("/", function(req, res) {
    const Item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(Item);
        res.redirect("/work");
    }else {
        Items.push(Item);   
        res.redirect("/");
    }        
});



app.post("/work", function(req, res) {
    const Item = res.body.newItem;
    workItems.push(Item);
    res.redirect("/work");
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems})
});

app.get("/about", function(req, res) {
    res.render("about");
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 30000");
});


