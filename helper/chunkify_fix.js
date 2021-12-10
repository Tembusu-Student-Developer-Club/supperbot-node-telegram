function createChunks(message, maxChars){
    if (maxChars < 1){
        throw "Invalid input";
    }

    let chunks = [];

    if (message.length <= maxChars){
        chunks.push(message);
        return chunks;
    }

    const firstSection = message.slice(0, maxChars);

    const nextlineIdx = firstSection.lastIndexOf('\n');
    const carriageIdx = firstSection.lastIndexOf('\r');
    const breakIdx = Math.max(nextlineIdx, carriageIdx); //the last occurrence of carriage return and newline

    let currLine = '', remainder = '', splitIdx = 0, remIdx = 0;
    
    if (breakIdx >= 0){
        splitIdx = breakIdx;
        remIdx = breakIdx + 1;
    } else {
        const whitespaceIdx = firstSection.lastIndexOf(' ');
        if (whitespaceIdx >= 0){
            splitIdx = whitespaceIdx;
            remIdx = whitespaceIdx + 1;
        } else {
            splitIdx = maxChars;
            remIdx = maxChars;
        }
    }

    currLine = message.slice(0, splitIdx)
    remainder = message.slice(remIdx);
    chunks.push(currLine);

    const subChunk = createChunks(remainder, maxChars);
    for (let i = 0; i < subChunk.length; ++i){
        chunks.push(subChunk[i]);
    }
    return chunks;
}

module.exports = {createChunks: createChunks};