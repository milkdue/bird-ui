/*
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-01-17 12:02:40
 * @LastEditTime: 2024-01-17 12:04:16
 */
function handleMatch(content) {
    const lines = content.split(/\r?\n/);
    const len = lines.length;

    if (len === 1) {
        return {
            title: "",
            desc: "",
            demoName: lines[0]
        };
    } else if (len === 2) {
        return {
            title: lines[0],
            desc: "<p></p>",
            demoName: lines[1]
        };
    } else {
        return {
            title: lines[0],
            desc: lines[1] || "<p></p>",
            demoName: lines[2]
        };
    }
}

exports.handleMatch = handleMatch;
