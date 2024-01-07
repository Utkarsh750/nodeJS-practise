const fs = require("fs");
const os = require("os");

// Blocking req
fs.writeFileSync("./test.js", "Hello text");

// Non-Blocking req
fs.writeFile("./test.txt", "Hello World", (err) => {});
console.log(os.cpus().length);
