var fs = require('fs')
const createChunks = require('./chunkify_fix.js').createChunks

function test_chunkify(fileName, maxChars) {
    const text = fs.readFileSync(fileName).toString("utf-8");
    const res = createChunks(text, maxChars);

    for (let i = 0; i < res.length; ++i) {
        console.log(i);
        console.log(res[i]);
    } //unable to print all strings when using console.log(res[i])
    return res;
}

let res = [];
try {
    res = test_chunkify('./test_inputs.txt', Math.floor((Math.random() * 10000)));
    console.log(res);
} catch (e) {
    console.log(e);
}