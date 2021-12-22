const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("You land on a wrong planet, no one lives here.");
});

// ROUTES


app.listen(port, ()=> {
    console.log(`App is listening at http://localhost:${port}`);
});

module.exports = app;