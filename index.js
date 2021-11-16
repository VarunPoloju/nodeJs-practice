const fs = require('fs');
const http = require('http');
const url = require('url');

// read from file - synchronous -- Blocking behaviour
// const input1In = fs.readFileSync('./txt/input1.txt', 'utf-8');
// console.log(input1In);


// write to a file -synchronous -- Blocking behaviour
// const outputOut = `This is what we know about avacado: ${input1In}.\ncreated on ${Date.now()}`;
// fs.writeFileSync('./txt/outputOut.txt', outputOut);
// console.log('File written success!!');



// Non blocking- asynchronous way
// fs.readFile('./txt/start.txt','utf-8',(err,data)=>{
//     console.log(data);
// })



// =======================================================
// creating a simple web server
// const server = http.createServer((req, res) => {
// console.log(req.url);
//     res.end('Hello from the server!!')
// })

// server.listen(5000, () => {
//     console.log('server listening on port 5000!');
// })



// =====================================================
// Routing & Building a very simple API


const replaceHtml = (temp,product)=>{
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output = output.replace(/${%IMAGE%}/g,product.image);
    output = output.replace(/${%PRICE%}/g,product.price)
    output = output.replace(/${%FROM%}/g,product.from)
    output = output.replace(/${%NUTRIENTS%}/g,product.nutrients)
    output = output.replace(/${%QUANTITY%}/g,product.quantity)
    output = output.replace(/${%DESCRIPTION%}/g,product.description)
    output = output.replace(/${%ID%}/g,product.id)

    if(!product.organic){
        output=output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
        return output;
    }
} 
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');

const tempoverview = fs.readFileSync('./templates/template-overview.html', 'utf-8');
const temproduct = fs.readFileSync('./templates/template-product.html', 'utf-8');
const tempcard = fs.readFileSync('./templates/template-card.html', 'utf-8');


const dataObject = JSON.parse(data);


const server1 = http.createServer((req, res) => {
    // console.log(req.url);
    const pathName = req.url;

    // OVERVIEW PAGE
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const cardshtml = dataObject.map(el=> replaceHtml(tempcard,el)).join('');
        const output = tempoverview.replace('{%PRODUCT_CARDS%}',cardshtml)
        // console.log(cardshtml);
        res.end(output);
    }










    // PRODUCT PAGE
    else if (pathName === '/product') {
        res.end('This is Product');
    }
    // API PAGE
    else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data);
    }
    // NOT FOUND
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'My-own-header': 'Hello-world'
        });
        res.end('<h1>Page not found</h1>')
    }
})

server1.listen(3000, () => {
    console.log('Server is listening on port 3000!');
})


// ================================================================


