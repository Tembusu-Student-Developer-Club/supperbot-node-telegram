function chunkify(message, maxChars){
    let lines = message.split(/\n/);
    let chunks = [];
    let numChars = 0;
    for (let i = 0; i < lines.length; i++){
        numChars = lines[i].length;
        if (numChars < maxChars){
            chunks.push(lines[i]);
        } else {
            let loc = lines[i].lastIndexOf(" ");
            let subchunk = "";
            let subsubchunks = [];
            if (loc >= 0 && loc < maxChars){
                chunks.push(lines[i].slice(0, loc));
                subchunk = lines[i].slice(loc);
            } else {
                chunks.push(lines[i].slice(0, maxChars - 1));
                subchunk = lines[i].slice(maxChars - 1);

            }
            subsubchunks = chunkify(subchunk, maxChars);
            for (let j = 0; j < subsubchunks.length; j++) {
                chunks.push(subsubchunks[j]);
            }
        }
    }
    return chunks;
}

module.exports = {chunkify: chunkify};