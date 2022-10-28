const messenger = require('../messenger');
const queries = require('../db/queries');
const {debug, stringsToMatch} = require('../config');

module.exports.birthday = async function (msg) {
    const originalText = msg.text;
    if(debug){
        console.log("entered birthday function with text \"" + originalText + "\" from " + msg.from.username);
    }
    const lowerText = originalText.toLowerCase();
    let matched = false;
    for (const str of stringsToMatch) {
        let exp = str + "\\S*";
        const regex = new RegExp(exp);
        if (regex.test(lowerText)) {
            matched = true;
            break;
        }
    }
    if(debug){
        console.log("matched: " + matched);
    }
    if (matched) {
        const count = await queries.repeatCount(msg.chat.id+originalText);
        if (count === 9) {
            messenger.send(msg.chat.id, originalText)
        }
    }
}