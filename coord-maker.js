const coordMaker = nums => {
  if (typeof nums !== 'string') throw new TypeError('Digits must be a string!')
  if (nums.length !== 10) throw new RangeError("Input must be ten digits long!");

  numberArray = Array.from(nums, num => Number(num));

  let coord = [];
  let coords = [];

  for (let i = 0; i < 10; i++) {
    if (Number.isNaN(numberArray[i])) throw new TypeError('Input must only contain string digits!')

    if (i % 2 === 1) {
      coord.push(numberArray[i]);
      coords.push(coord);
      coord = [];
    } else {
      coord.push(numberArray[i])
    }
  }
  return coords;
}

module.exports = coordMaker