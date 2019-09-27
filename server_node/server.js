const express = require('express');
const app = express();
const chart1 = require('./data.json');

app.use(express.json());

app.get("/chart1",function(req, res){
    res.json(chart1);
});


app.get("/clients/:id",function(req, res){
    const { id } = req.params;
    const user = users.find(us => us.id == id);
    if(!user) return res.status(204).json();
    res.json(user);
});



app.listen(3000,function(){
    console.log("Server is running");
});