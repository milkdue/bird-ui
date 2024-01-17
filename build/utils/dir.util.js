/*
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-01-17 15:17:00
 * @LastEditTime: 2024-01-17 15:42:34
 */
const path = require("path");
const fs = require("fs");

function walkSync(currentPath, fileName) {
    let resultPath = "";

    let paths = fs.readdirSync(currentPath);

    for (let p of paths) {
        let filePath = path.join(currentPath, p);
        let stat = fs.lstatSync(filePath);

        if (stat.isDirectory()) {
            resultPath = walkSync(filePath, fileName);
        } else if (stat.isFile()) {
            if (p === fileName) {
                return filePath;
            }
        }
    }

    return resultPath;
}

exports.walkSync = walkSync;
