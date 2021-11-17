const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1 --> not so efficent bcz it reads entire file
  // fs.readFile('./txt/input1.txt', (err, data) => {
  //     if (err) {
  //         console.log(err);
  //     }
  //     else {
  //         res.end(data)
  //     }
  // })

  // soultion 2
  // const readable = fs.createReadStream('./txt/input1.txt')
  // readable.on('data', chunk => {
  //     res.write(chunk)
  // })
  // readable.on('end', () => {
  //     res.end();
  // })
  // readable.on('error', err => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('file not found')
  // })

  // solution-3 ==best
  const a = fs.createReadStream("./txt/input1.txt");
  a.pipe(res);
});

server.listen(4000, () => {
  console.log("server started on port 4000");
});
