var express = require('express');
var router = express.Router();

router.get('/hello',sayHello);
router.get('/howAreYou/:who',sayThankyou);

function sayHello(req,res){
    res.send('Hello Router');
}
function sayThankyou(req,res){
    var who = req.params.who;
    res.send('Fine Thank You ' + who + " And  you?");
}
module.exports = router;