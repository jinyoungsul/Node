var http = require('http');
var fs = require('fs');

var movieList = JSON.parse(fs.readFileSync('./movieData.json'));

http.createServer(function(req,res){
    switch(req.method.toLowerCase()){
        case 'get' :
            handleGetRequest(req,res);
            return;
        case 'put' :
            handlePutRequest(req,res);
            return;
        case 'post' :
            handlePostRequest(req,res);           
            return;
        case 'delete' :
            handleDeleteRequest(req,res);
            return;
        default : 
            res.statusCode = 404;
            res.end('잘못된 요청입니다.');
            return;

    }
}).listen(3000);

function handleGetRequest(req,res){
    if(req.url == '/movies'){
        var result = {
            count : movieList.length,
            data : movieList
        };
        res.writeHead(200, {'content-type' : 'application/json'});
        res.end(JSON.stringify(result));
    } else {
        var id = req.url.split('/')[2];
        var movie = null;
        for(var i=0 ; i<movieList.length ; i++){
            if(id == movieList[i].id){
                movie = movieList[i];
                break;
            }
        }
        if(movie){
            res.writeHead(200, {'content-type':'application/json'});
            res.end(JSON.stringify(movie));
        } else {
            var message = {
                error : {
                    code : 404,
                    message : '영화 정보가 없습니다.'
                }
            };
            res.writeHead(200, {'content-type':'application/json'});
            res.end(JSON.stringify(message));
        }
    }
}

function handlePutRequest(req,res){

}
function handlePostRequest(req,res){
    var data = '';
    req.on('data', function(chunk){
        data += chunk;
    });
    req.on('end', function(){
        var parsed = JSON.parse(data);
        var title = parsed.title;
        var director = parsed.director;
        var year = parseInt(parsed.year);
        var synopsis = parsed.synopsis;

        var movie = {
            id : movieList.length,
            title : title,
            director : director,
            year : year,
            synopsis : synopsis
        };
        movieList.push(movie);

        res.writeHead(200, {'content-type':'application/json'});
        res.end(JSON.stringify({result : 'Success'}));
    })  
}
function handleDeleteRequest(req,res){
    var url = req.url;
    var id = url.split('/')[2];

    for(var i=0; i<movieList.length ; i++){
        if(id == movieList[i].id){
            movieList.splice(i, 1);
            break;
        }
    }
    var message = {
        result : {
            id : id,
            message : 'Delete Success'
        }
    }
    res.writeHead(200, {'content-type':'application/json'});
    res.end(JSON.stringify(message));
}