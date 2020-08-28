const Board = require('./board-class');

// Add count method. Just like in Python!
Array.prototype.count = function(element) {
  return this.filter(x => x === element).length
} 

const board = new Board();

board.move(0, 'x');
board.move(0, 'y');
board.move(0, 'x');
board.move(0, 'y');
board.scan();

board.show();