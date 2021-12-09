function chunkify(message, maxChars){
    const lines = message.split(/\n/);
    let chunks = [];
    let line = '';
    for (let i = 0; i < lines.length; i++){
        const numChars = lines[i].length;
        if (line.length + numChars < maxChars){
            line += lines[i];
            chunks.push(line);
        } else {
            const space_idx = lines[i].lastIndexOf(" ");
            let subChunk = "";
            let subSubChunks = [];
            if (space_idx >= 0 && space_idx < maxChars - line.length){
                line += lines[i].slice(0, space_idx);
                chunks.push(line);
                subChunk = lines[i].slice(space_idx + 1);
            } else {
                chunks.push(line);
                chunks.push(lines[i].slice(0, maxChars - 1))
                subChunk = lines[i].slice(maxChars);

            }
            subSubChunks = chunkify(subChunk, maxChars);
            for (let j = 0; j < subSubChunks.length; j++) {
                chunks.push(subSubChunks[j]);
            }
        }
    }
    return chunks;
}


module.exports = {chunkify: chunkify};
