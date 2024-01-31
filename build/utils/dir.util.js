/*
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-01-17 15:17:00
 * @LastEditTime: 2024-01-31 18:06:50
 */
const path = require("path");
const fs = require("fs");

function walkSync(currentPath, fileName) {
    let resultPath;

    let traverse = function(currentPath, fileName) {
        let paths = fs.readdirSync(currentPath);

        for (let p of paths) {
            let filePath = path.join(currentPath, p);
            let stat = fs.lstatSync(filePath);

            if (stat.isFile()) {
                if (p === fileName) {
                    resultPath = filePath;
                    return;
                }
            } else {
                traverse(filePath, fileName);
            }
        }
    };

    traverse(currentPath, fileName);
    return resultPath;
}

exports.walkSync = walkSync;
