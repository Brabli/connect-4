const assert = require('assert');
const coordMaker = require('../coord-maker');

describe('Coord Maker', () => {
  it('returns an array of numbers from an eight digit string', () => {
    const eightDigits = "12345678";
    const expectedOutput = [[1, 2], [3, 4], [5, 6], [7, 8]];

    actualOutput = coordMaker(eightDigits);

    assert.deepStrictEqual(actualOutput, expectedOutput)
  })

  it('returns an array of numbers with zeros included', () => {
    const eightDigits = "00010203";
    const expectedOutput = [[0, 0], [0, 1], [0, 2], [0, 3]]

    actualOutput = coordMaker(eightDigits);

    assert.deepStrictEqual(actualOutput, expectedOutput)
  })

  it('raises an error if the incorrect number of digits is passed in', () => {
    const sevenDigits = "1234567";
    const nineDigits = "123456789";
    
    assert.throws(() => {coordMaker(sevenDigits)}, RangeError);
    assert.throws(() => {coordMaker(nineDigits)}, RangeError);
  })

  it('raises an error if type of argument is not a string', () => {
    const notAString = 12345678;
    const alsoNotAString = undefined;

    assert.throws(() => {coordMaker(notAString)}, TypeError);
    assert.throws(() => {coordMaker(alsoNotAString)}, TypeError);
  })

  it('raises an error if the string contains non-numeric characters', () => {
    const incorrectString = "123A56B8";

    assert.throws(() => {coordMaker(incorrectString)}, TypeError);
  })
})