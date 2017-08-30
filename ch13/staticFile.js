var express = require('express');
var app = express();

app.use(express.static(__dirname + '/images'));
//app.use(express.static('public'));

app.use(function(req,res){
    res.send('Hello Express');
    res.end();
})

app.listen(3000);