process.on('exit',function(code){
    console.log('exit event : ',code);
});

process.once('exit',function(code){
    console.log('exit event with once: ',code);
});

process.emit('exit',3);
process.emit('exit',1);
process.emit('exit',2);

process.on('uncaughtException',function(code){
    console.log('uncaughtException');
});

sayHello();