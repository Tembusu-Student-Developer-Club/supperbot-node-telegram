const fs = require("fs");
const YAML = require("js-yaml");


class Menu {
    constructor(text) {
        this.delivery = text['Delivery'];
        this.instructions = text['Instructions']; // If instructions provided
        this.dishes = text['Menu'];
        this.modifiers = text['Modifiers'];
    }
}

// Returns menu object
function getMenuFromFile(fileName) {
    try {
        const raw = fs.readFileSync(fileName, 'utf-8');
        const data = YAML.load(raw)
        const menu = new Menu(data);
        return menu;
    } catch (e) {
        console.log(e);
    }

}

exports.getMenuFromFile = getMenuFromFile;

// To print the result of the parsed yaml
// console.log(getMenuFromFile('../menu.yml'))





