const queries = require('../db/queries');
const {debug} = require("../config");

module.exports.init = async function (msg) {
    try {
        await queries.updateUsername({
            user_id: msg.from.id,
            user_name: msg.from.username,
        });
        if(debug){
            console.log("updated username for id " + msg.from.id + " with " + msg.from.username);
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.getUsername = async function (msg) {
    try {
        let name = await queries.getUsernameFromID({
            user_id: msg.from.id,
        });
        if(debug){
            console.log("retrieved username " + name + " for user if " + msg.from.id);
        }
        return name;
    } catch (err) {
        console.log(err);
    }
}