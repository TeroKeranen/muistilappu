const express = require('express');
const bodyParser = require('body-parser');

const app = express(); 

app.set('view engine', 'ejs'); // set ejs to project

app.get("/", (req,res ) => {

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleString("en-US", options)

    res.render('list', {thisDay: day})

})


app.listen(3000, function () {
    console.log("Server started on port 3000");
})