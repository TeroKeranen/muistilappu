const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express(); 

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))

app.set('view engine', 'ejs'); // set ejs to project

mongoose.connect("mongodb+srv://testi:testi@cluster0.xecqchu.mongodb.net/muistilappu")

const itemsSchema = {
    name: String
}

const Item = mongoose.model("Item", itemsSchema)


app.get("/", (req,res ) => {

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    
    let day = today.toLocaleString("en-US", options)


    Item.find()
        .then((result) => {
            res.render('list', {thisDay:day, newItems:result})
        })
        .catch((err) => {
            console.log(err)
        })
    

})

app.post("/", (req,res) => {

    itemName = req.body.newItem;
    
    const item = new Item({
        name: itemName
    })
    
    item.save(function(err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/');
        }
    })

})

app.post("/delete", (req,res) => {

    let deleteItem = req.body.checkbox;

    Item.findByIdAndDelete(deleteItem, function(err) {
        if (!err) {
            console.log("Tuote poistettu listalta");
            res.redirect("/");
        } else {
            console.log(err);
        }

    })
    

})


app.listen(3000, function () {
    console.log("Server started on port 3000");
})