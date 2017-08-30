 var express = require('express');
 var app = express();
app.use(function(req,res){
    res.send('Hellow Express');
    res.end();
});

app.listen(3000);