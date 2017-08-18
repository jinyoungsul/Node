var http = require('http');
var url = require('url');
http.createServer(function(req,res){
    var parsed = url.parse(req.url,true);
    var query = parsed.query;
    var start = parseInt(query.start);
    var end = parseInt(query.end);

    if(!start || !end){
        res.statusCode = 404;
        res.end('Wrong Parameter');
    } else {
        var sum = 0;
        for(var i=start ; i<=end ; i++){
            sum += i;
        }
        res.statusCode = 200;
        res.end('Sum : '+ sum);
    }
}).listen(3000);