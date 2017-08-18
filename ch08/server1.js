var http = require('http');
var fs = require('fs');

http.createServer(function(req,res){
    fs.access('./cat.jpg',function(err){
        if(err){
            res.statusCode = 404;
            res.statusMessage = 'Not Found';
            res.end();
            return;
        }
        fs.readFile('./cat.jpg',function(err,data){
            res.end(data);
        })
    });
}).listen(3000);