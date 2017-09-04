var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.post('/',function(req,res){
    var title = req.body.title;
    var director = req.body.director;
    res.end('제목 : ' + title + ', 감독 : '+director);
});

app.listen(3000);
