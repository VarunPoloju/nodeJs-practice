const fs = require('fs');
const http = require('http');
const url = require('url')

setTimeout(() => { console.log("Timer 1 finished"); }, 0);
setImmediate(() => { console.log("Immediate Timer finished"); })

fs.readFile('../txt/input1.txt', 'utf-8', () => {
    console.log('Reading of input file success');
    setTimeout(() => { console.log("Timer 2 finished"); }, 3000);
    setImmediate(() => { console.log("Immediate Timer 2 finished"); })
    setTimeout(() => { console.log("Timer 3 finished"); }, 5000);
    process.nextTick(()=>{console.log('Process.nextTick');})
})


const server = http.createServer((req,res)=>{
    res.end('New web page created')
});

server.listen(5000,()=>{
    console.log('server started on port 5000!');
})
console.log('Hello from top-level code!!');