var http = require('http');
var fs = require('fs');
var pathUtil = require('path');
var formidable = require('formidable');

//upload folder
var uploadDir = __dirname + '/upload';
//image folder
var imageDir = __dirname + '/image/';
//uploaded data list
var paintList = [];

http.createServer(function(req,res){
    //root req
    if(req.method.toLowerCase() == 'get' && req.url == '/'){
        showList(res);
    }
    //<img> req
    else if (req.method.toLowerCase() == 'get' && req.url.indexOf('/image') == 0) {
        var path = __dirname + req.url;
        res.writeHead(200, { 'Content-Type': 'image/jpeg' })
        fs.createReadStream(path).pipe(res);
    } 
    //image upload req
    else if(req.method.toLowerCase() == 'post'){
        addNewPaint(req,res);
    }
}).listen(3000);

function showList(res){
    res.writeHeader(200,{'content-type':'text/html'});
    
    var body = '<html>';
    body += '<head><meta charset="UTF-8"></head>';
    body += '<body>';
    body += '<h3>Favorite Paint</h3>';
 
    body += '<ul>';
    paintList.forEach(function (item, index) {
       body += '<li>';
       if (item.image) {
          body += '<img src="' + item.image + '" style="height:100pt"></img>';
       }
       body += item.title;
       body += '</li>';
    });
    body += '</ul>';
 
    body += '<form action="." enctype="multipart/form-data" method="post">' +
    '<div><label>작품 이름 : </label><input type="text" name="title"></div>' +
    '<div><label>작품 이미지 : </label><input type="file" name="image" value="작품 파일 선택"></div>' +
    '<input type="submit" value="upload">' +
    '</form>';
    body += '</body></html>';
 
    res.end(body);
}
function addNewPaint(req,res){
    var form = formidable.IncomingForm();
    form.uploadDir = uploadDir;

    form.parse(req, function(err, fields, files){
        var title = fields.title;
        var image = files.image;

        console.info(image);

        var date = new Date();
        var newImageName = 'img_' + date.getHours() + date.getMinutes() + date.getSeconds();
        var ext = pathUtil.parse(image.name).ext;
        var newPath = imageDir + newImageName + ext;
        console.log(newPath);
        fs.renameSync(image.path,newPath);

        var url = 'image/' + newImageName + ext;
        var info = {
            title : title , image : url
        }
        paintList.push(info);
        
        res.statusCode = 302;
        res.setHeader('Location', '.');        
        res.end('Success');
    });
}
