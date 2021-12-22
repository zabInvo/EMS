const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("You land on a wrong planet, no one lives here.");
});

// ROUTES FOR ADMIN
app.use('/api/admin', require('./routes/admin'));
// ROUTES FOR COMPANY
app.use('/api/company', require('./routes/company'));
// ROUTES FOR EMPLOYEE
app.use('/api/employee', require('./routes/employee'));


app.listen(port, ()=> {
    console.log(`App is listening at http://localhost:${port}`);
});

module.exports = app;