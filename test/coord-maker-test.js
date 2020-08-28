const assert = require('assert');
const coordMaker = require('../coord-maker');

describe('Coord Maker', () => {
  it('returns an array of numbers from a ten digit string', () => {
    const tenDigits = "1234567899";
    const expectedOutput = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 9]];

    actualOutput = coordMaker(tenDigits);

    assert.deepStrictEqual(actualOutput, expectedOutput)
  })

  it('returns an array of numbers with zeros included', () => {
    const tenDigits = "0001020304";
    const expectedOutput = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]];

    actualOutput = coordMaker(tenDigits);

    assert.deepStrictEqual(actualOutput, expectedOutput)
  })

  it('raises an error if the incorrect number of digits is passed in', () => {
    const elevenDigits = "12345678987";
    const nineDigits = "123456789";
    
    assert.throws(() => {coordMaker(elevenDigits)}, RangeError);
    assert.throws(() => {coordMaker(nineDigits)}, RangeError);
  })

  it('raises an error if type of argument is not a string', () => {
    const notAString = 1234567898;
    const alsoNotAString = undefined;

    assert.throws(() => {coordMaker(notAString)}, TypeError);
    assert.throws(() => {coordMaker(alsoNotAString)}, TypeError);
  })

  it('raises an error if the string contains non-numeric characters', () => {
    const incorrectString = "123A56B898";

    assert.throws(() => {coordMaker(incorrectString)}, TypeError);
  })
})