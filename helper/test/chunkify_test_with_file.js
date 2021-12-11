var fs = require('fs')
const chunkify = require('./chunkify.js').chunkify

function test_chunkify(fileName, maxChars) {
    const text = fs.readFileSync(fileName).toString("utf-8");
    const res = chunkify(text, maxChars);

    for (let i = 0; i < res.length; ++i) {
        console.log(i);
        console.log(res[i]);
    } //unable to print all strings when using console.log(res[i])
    return res;
}

let res = [];
try {
    res = text_chunkify('./test_inputs.txt', 0) //test case for error handling
//     res = test_chunkify('./test_inputs.txt', Math.floor((Math.random() * 10000)));
    console.log(res);
} catch (e) {
    console.log(e);
}