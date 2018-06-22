// ex1
console.log(1);
console.log(2);
setTimeout(function(){
    console.log('setTimeout1')
    Promise.resolve().then(function(){
        console.log('Promise')
    })
})
setTimeout(function(){
    console.log('setTimeout2')
})


// ex2
// console.log(1);
// console.log(2);
// setTimeout(function(){
//     console.log('setTimeout1')
//     Promise.resolve().then(function(){
//         console.log('Promise')
//     })
// },1000)
// setTimeout(function(){
//     console.log('setTimeout2')
// },1000)
