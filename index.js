// // const math = require("./math")
// const math = require("fs")

// // console.log("Value of add is", math.add(2,3));
// // console.log("Value of add is", math.sub(2,3));
// console.log("Value of add is", math);

const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  //   console.log(req.headers);
  const log = `${Date.now()}: ${req.url} New req recived\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("HomePage");
        break;

      case "/about":
        res.end(" I am about page of Utkarsh Sharma");
        break;

      case "/contact":
        res.end("This is my contact megayt750@gmail.com");
        break;

      default:
        res.end("404 not found");
    }
  });
});

myServer.listen(8000, () => {
  console.log("Server started");
});
