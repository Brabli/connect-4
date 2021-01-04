const Board = require('./board-class');
const { prototype } = require('./line-class');

// Add count method. Just like in Python!
Array.prototype.count = function(element) {
  return this.filter(x => x === element).length
} 

const board = new Board();

const player = "x";
const computer = "y";


board.move(0, 'x');
board.move(0, 'y');
board.move(0, 'x');
board.move(4, 'y');
board.move(4, 'x');
board.move(3, 'y');
board.move(3, 'x');
board.move(0, 'y');
board.move(2, 'x');
board.move(1, 'y');
board.show();

// const lines = board.scan(true);
// const filteredLines = lines.filter(line => line.useful)
// console.log(filteredLines[5]);
// //.forEach(line => console.log(line));
