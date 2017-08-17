function task(fullfill, reject){
    console.log('Task 시작')
    setTimeout(function(){
        console.log('Task 끝');
        //fullfill('Task 결과');
        reject('Error msg');    //error
    }, 300);
}

function fullfilled(result){
    console.log('fullfilled: ',result);
}
function rejected(err){
    console.error('rejected: ',err);
}
new Promise(task).then(fullfilled, rejected);