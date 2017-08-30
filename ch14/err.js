var express = require('express');
var app = express();

app.get('/:value',work);
app.use(errorHandler);
app.listen(3000);

function work(req,res,next){
    var value = parseInt(req.params.value);
    
    if(!value){
        var err = new Error('숫자가 아닙니다.');
        next(err);
        return;
    }
    res.send('result : '+value);
}
function errorHandler(err,req,res,next){
   if(err){
       console.error(err.stack);
       res.status(500).send({ error: err.message });
       return;
   }
}
