const chunkify = require('../../helper/chunkify').chunkify;
const randomTextGenerator = require('./randomTextGenerator').randomTextGenerator;
const readTextFile = require('./readTextFile').readTextFile;
const assert = require('assert');

const SMALL_CHAR_LIMIT = 60;
const TELEGRAM_CHAR_LIMIT = 4096; //Telegram supports up to 4096 UTF-8 characters

const EMPTY_STRING = "";

/**
 * Testing suite for chunkify.js.
 * Method signature for Chunkify is (message, maxChars).
 */

describe('Chunkify', function () {
    /**
     * Tests whether error is thrown when an EMPTY_STRING and valid CHAR_LIMIT is passed.
     */
    it('should not throw an error when an empty String is passed in with valid CHAR_LIMIT', function(done) {
        assert.doesNotThrow(() => {chunkify(EMPTY_STRING, SMALL_CHAR_LIMIT)});
        done();
    });

    /**
     * Tests whether valid message within a specified CHAR_LIMIT is un-modified.
     */

    it('should not modify valid simple messages', function(done) {
        const actualChunkifiedMessage = chunkify("Valid Message", TELEGRAM_CHAR_LIMIT);
        assert.deepEqual(actualChunkifiedMessage, ["Valid Message"]);
        done();
    });

    /**
     * Tests whether small valid messages containing CHAR_LIMIT characters is un-modified.
     */

    it('should not modify valid small messages', function(done) {
        const VALID_SMALL_TEST_MESSAGE = randomTextGenerator(SMALL_CHAR_LIMIT);
        const actualChunkifiedMessage = chunkify(VALID_SMALL_TEST_MESSAGE, SMALL_CHAR_LIMIT);
        assert.deepEqual(actualChunkifiedMessage, [VALID_SMALL_TEST_MESSAGE]);
        done();
    });

    /**
     * Tests whether large valid messages containing CHAR_LIMIT characters is un-modified.
     */

    it('should not modify valid large messages', function(done) {
        const VALID_LARGE_TEST_MESSAGE = randomTextGenerator(TELEGRAM_CHAR_LIMIT);
        const actualChunkifiedMessage = chunkify(VALID_LARGE_TEST_MESSAGE, TELEGRAM_CHAR_LIMIT);
        assert.deepEqual(actualChunkifiedMessage, [VALID_LARGE_TEST_MESSAGE]);
        done();
    });

    /**
     * Tests whether large messages containing number of characters greater than CHAR_LIMIT characters are modified appropriately
     * (i.e. no Empty Strings within output).
     */

    it('should split large messages in order of linebreaks, whitespace and characters where appropriate', function(done) {
        const LARGE_TEST_MESSAGE = randomTextGenerator(TELEGRAM_CHAR_LIMIT * Math.floor((Math.random() * 10)));
        const actualChunkifiedMessage = chunkify(LARGE_TEST_MESSAGE, TELEGRAM_CHAR_LIMIT);
        for (let i = 0; i < actualChunkifiedMessage.length; ++i){
            assert(actualChunkifiedMessage[i].length > 0 && actualChunkifiedMessage[i].length <= TELEGRAM_CHAR_LIMIT);
        }
        done();
    });

    /**
     * Tests whether exception is thrown when invalid/negative CHAR_LIMIT are passed into chunkify
     */

    it('should throw error when maxChars is less than 1', function(done) {
        const VALID_SMALL_TEST_MESSAGE = randomTextGenerator(SMALL_CHAR_LIMIT);
        assert.throws(
            () => {
                chunkify(VALID_SMALL_TEST_MESSAGE, Math.floor((Math.random() * -10)));
            }
        );
        done();
    });

    /**
     * Tests whether small valid messages converted from text files to a String containing CHAR_LIMIT characters is un-modified.
     */

    it('should not modify valid small messages converted from text files to a String', function(done) {
        const testFilePath = "test/chunkify/testInputSmall.txt";
        const VALID_SMALL_TEST_MESSAGE = readTextFile(testFilePath);
        const actualChunkifiedMessage = chunkify(VALID_SMALL_TEST_MESSAGE, SMALL_CHAR_LIMIT);
        assert.deepEqual(actualChunkifiedMessage, [VALID_SMALL_TEST_MESSAGE]);
        done();
    });

    /**
     * Tests whether large valid messages converted from text files to a String containing CHAR_LIMIT characters is un-modified.
     */

    it('should not modify valid large messages converted from text files to a String', function(done) {
        const testFilePath = "test/chunkify/testInput.txt";
        const VALID_LARGE_TEST_MESSAGE = readTextFile(testFilePath);
        const actualChunkifiedMessage = chunkify(VALID_LARGE_TEST_MESSAGE, TELEGRAM_CHAR_LIMIT);
        assert.deepEqual(actualChunkifiedMessage, [VALID_LARGE_TEST_MESSAGE]);
        done();
    });

    /**
     * Tests whether large messages converted from text files to a String containing number of characters greater than CHAR_LIMIT characters are modified appropriately
     * (i.e. no Empty Strings within output and split in order of linebreaks, whitespace and characters where appropriate).
     */

    it('should split large messages converted from text files to a String in order of linebreaks, whitespace and characters where appropriate', function(done) {
        const testFilePath = "test/chunkify/testInputLarge.txt";
        const LARGE_TEST_MESSAGE = readTextFile(testFilePath);
        const actualChunkifiedMessage = chunkify(LARGE_TEST_MESSAGE, TELEGRAM_CHAR_LIMIT);
        for (let i = 0; i < actualChunkifiedMessage.length; ++i){
            assert(actualChunkifiedMessage[i].length > 0 && actualChunkifiedMessage[i].length <= TELEGRAM_CHAR_LIMIT);
        }
        done();
    });

    /**
     * Tests whether exception is thrown when invalid/negative CHAR_LIMIT and a text file converted to a String are passed into chunkify
     */

    it('should throw error when maxChars is less than 1', function(done) {
        const testFilePath = "test/chunkify/testInputSmall.txt";
        const VALID_SMALL_TEST_MESSAGE = readTextFile(testFilePath);
        assert.throws(
            () => {
                chunkify(VALID_SMALL_TEST_MESSAGE, 0);
            }
        );
        done();
    });

})