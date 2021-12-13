const text = "";
function test_chunkify(text, maxChars) {
    const res = chunkify(text, maxChars);
    for (let i = 0; i < res.length; ++i) {
        console.log(i);
        console.log(res[i]);
    } //unable to print all strings when using console.log(res[i])
    return res;
}

let res = [];
try {
    res = test_chunkify(text, 0);
    console.log(res);
} catch (e) {
    console.log(e);
}
