var http = require('http');
var movieList = [{title : '아바타', director : '제임스 카메론'}];

http.createServer(function(req,res){
    if(req.method.toLowerCase() == 'post'){
        var buffer ='';
        req.on('data',function(chunk){
            buffer += chunk;
        });
        req.on('end',function(){
            var parsed = JSON.parse(buffer);
            var title = parsed.title;
            var director = parsed.director;
            movieList.push({
                title : title,
                director : director
            });
            res.writeHead(200, {'content-type':'application/json'});
            res.end(JSON.stringify({result:'Success'}));
        });
    } else {
        var result = {
            count : movieList.length,
            movieList : movieList
        };
        res.writeHead(200, {'content-type':'application/json'});
        res.end(JSON.stringify(result));
    }
}).listen(3000);