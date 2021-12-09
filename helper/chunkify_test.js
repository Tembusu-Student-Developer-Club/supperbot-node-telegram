var fs = require('fs')
const chunkify = require('./chunkify.js').chunkify

function test_chunkify(fileName, maxChars) {
    let text = "";
    fs.readFile(fileName, (err, data) =>  {
        text = data.toString("utf-8");
        const res = chunkify(text, maxChars);

        for (let i = 0; i < res.length; i++) {
            console.log(res[i]);
        } //unable to print all strings when using console.log(res[i])
        return res;
    })
}

test_chunkify('./test.txt', 4000);