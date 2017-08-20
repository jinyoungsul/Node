var http = require('http');
var pathUtil = require('path');
var fs = require('fs');
var formidable = require('formidable');

var uploadDir = __dirname + '/upload';
var imageDir = __dirname + '/image/';

var movieList = JSON.parse(fs.readFileSync('./initialDB.json'));

var server = http.createServer(function(req,res){
    if(req.method.toLowerCase() == 'get' && req.url == '/'){
        showMovieList(res);
    } else if(req.method.toLowerCase() == 'get' && req.url.indexOf('/image') == 0){
        var path = __dirname + req.url;
        res.writeHeader(200, {'content-type':'image/jpeg'})
        fs.createReadStream(path).pipe(res);
    } else if(req.method.toLowerCase() == 'post'){
        addNewMovie(req,res);
    }
});

server.listen(3000);

function showMovieList(res){
    res.writeHeader(200, {'content-type' : 'text/html' })
    
    var body = '<html>';
    body += '<head><meta charset="UTF-8"></head>';
    body += '<body>';
    body += '<h3>Favorite Paint</h3>';
 
    body += '<ul>';

    movieList.forEach(function(item, index){
        body += '<li>';
        if(item.poster){
            body += '<img src="' + item.poster + '" style="height:100pt"></img>';
        }
        body += item.title + '(' + item.director + ',' + item.year + ')';
    });

    body += '<h5>새 영화 입력</h5>';
    body += '<form method="post" action="." enctype="multipart/form-data">';
    body += '<ul>';
    body += '<li><label>영화 제목</label>';
    body += '<input type="text" name="title"/>';
    body += '<li><label>영화 감독</label>';
    body += '<input type="text" name="director"/>';
    body += '<li><label>연도</label>';
    body += '<input type="text" name="year"/>';
    body += '<li><label>포스터</label>';
    body += '<input type="file" name="poster"/>';
    body += '</ul>';
    body += '<input type="submit" value="올리기">';
    body += '</form>';

    body += '</body></html>';
    res.end(body);
}

function addNewMovie(req,res){
    var form = formidable.IncomingForm();
    form.uploadDir = uploadDir;

    form.parse(req, function(err, fields, files){
        var title = fields.title;
        var director = fields.director;
        var year = fields.year;
        var poster = files.poster;

        var date = new Date();
        var newPosterName = 'img_' + date.getHours() + date.getMinutes() + date.getSeconds();
        var ext = pathUtil.parse(poster.name).ext;
        var newPath = imageDir + newPosterName + ext;

        fs.renameSync(poster.path, newPath);

        var url = 'image/' + newPosterName + ext;
        var info = {
            title : title, director : director, year : year, poster : url
        }
        movieList.push(info);

        //PRG pattern
        res.statusCode = 302;
        res.setHeader('Location', '.');
        res.end('upload Succes');
    });
}