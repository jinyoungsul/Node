var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));

app.get('/hello',function(req,res){
    res.end('GET request, /hello');
});

app.get('/movies',function(req,res){
    res.end('GET request, /movies');    
});

app.listen(3000);