var express = require('express');
var app = express();

app.use(function(req,res,next){
    var date = new Date();
    console.log(date.toDateString() + ' url : '+ req.url);
    next();
});

app.use(function(req,res){
    res.send('Hello Express');
    res.end();
})

app.listen(3000);