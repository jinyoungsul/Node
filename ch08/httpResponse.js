var http = require('http');
http.createServer(function(req,res){
    res.statusCode = 200;
    res.statusMessage = 'okok';
    //res.setHeader('content-type','text/plain');
    res.write('<html><body><h1>Hello World!</h1></body></htm>');
    res.end();
}).listen(3000);