var http = require('http');
http.createServer(function(req,res){
    console.log('Method : ',req.method);
    console.log('url : ',req.url);
    console.log('headers : ',req.headers);
    //console.log('headers : ',req.headers['host']);
    
    res.write('Hello World');
    res.end();
}).listen(3000);