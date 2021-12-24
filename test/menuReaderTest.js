const assert = require('assert');
const getMenuFromFile = require('../helpers/menuReader').getMenuFromFile;
const Menu = require('../helpers/menuReader').Menu;

const SAMPLE_MENU = new Menu({
    "Delivery": 100,
    "Menu" : {
        "Butter Naan": {
            price: 200
        },
        "Butter Chicken": {
            price: 600
        }
    },
    Instructions: "Call 87654321 to order!",
    Modifiers: {
        "no ice": 30,
        "regular": 0
    }
})

describe('GetMenuFromFile', function() {
    it('should output valid menu', function(done) {
        const actualMenu = getMenuFromFile('test/testUtil/sampleMenu.yml')
        try {
            assert.deepEqual(actualMenu, SAMPLE_MENU);
            done();
        } catch (e) {
            console.log(e);
            done(e);
        }
    })


    it('should throw error with invalid file name', function(done) {
        assert.throws(function () {
            getMenuFromFile('test/testUtil/sampleMen.yml')
        })
        done()
    })

    it('should throw yml parsing error', function(done) {
        assert.throws(function () {
            getMenuFromFile('test/testUtil/invalidMenu.yml')
        })
        done()
    })
})