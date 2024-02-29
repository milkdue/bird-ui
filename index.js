const path = require("path");
const fs = require("fs");

let data = [];

let traverse = function(currentPath) {
    let paths = fs.readdirSync(currentPath);

    for (let p of paths) {
        data.push(`"${p.toString().split(".")[0]}"`);
    }
};

traverse(path.resolve(__dirname, "./packages/icons/fill"));

console.log(data.join(",").toString());
