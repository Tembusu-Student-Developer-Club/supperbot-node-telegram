// Import Dependencies
const fs = require("fs");
const YAML = require("js-yaml");

class Menu {
    constructor(text) {
        this.delivery = text.Delivery;
        this.instructions = text?.Instructions; // If instructions provided
        this.dishes = text.Menu;
        this.modifiers = text.Modifiers
    }

}

// Convert .yml file to object
const ymlFileToDict = (filename) => {
    try {
        const raw = fs.readFileSync(filename);
        const data = YAML.load(raw)
        return data
    } catch (e) {
        console.log(e)
    }
}
const getMenu = (data) => {
    const menu = new Menu(data)
    return menu
}






