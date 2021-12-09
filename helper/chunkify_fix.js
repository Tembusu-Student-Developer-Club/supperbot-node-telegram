function createChunks(message, maxChars){
    if (maxChars < 1){
        return null;
    }
    let chunks = [];

    if (message.length <= maxChars){
        chunks.push(message);
        return chunks;
    }

    const firstSection = message.slice(0, maxChars);

    const nextlineIdx = firstSection.lastIndexOf('\n')
    const carriageIdx = firstSection.lastIndexOf('\r')
    const whitespaceIdx = firstSection.lastIndexOf(' ');
    const maxIdx = Math.max(nextlineIdx, carriageIdx); //computes the max between the last occurrence of carriage return and newline

    let currLine = '', remainder = '';
    
    if (maxIdx > 0){
        currLine = message.slice(0, maxIdx);
        remainder = message.slice(maxIdx + 1);
    } else if (whitespaceIdx > 0){
        currLine = message.slice(0, whitespaceIdx);
        remainder = message.slice(whitespaceIdx + 1);
    } else {
        currLine = message.slice(0, maxChars);
        remainder = message.slice(maxChars);
    }
    chunks.push(currLine);

    const subChunk = createChunks(remainder, maxChars);
    for (let i = 0; i < subChunk.length; ++i){
        chunks.push(subChunk[i]);
    }
    return chunks;
}

module.exports = {createChunks: createChunks};