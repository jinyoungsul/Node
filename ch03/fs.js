var fs = require('fs');

/*
fs.readFile('./hello.txt','utf-8',function(err,data){
    if(err){
        console.error('File Read Error: ',err);
        return;
    }
    console.log('File: ',data);
});*/

try {
    var data = fs.readFileSync('./hello1.txt','utf-8');
    console.log(data);    
} catch (error) {
    console.error('Error: ',error);
}
