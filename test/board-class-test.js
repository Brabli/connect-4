const assert = require('assert');
const Board = require('../src/board-class');

describe('Board Class', () => {
  describe('move', () => {
    it('returns true if it makes a move', () => {
      board = new Board();
      for (let i = 0; i < 5; i++) {
        board.move(0, 'x');
      }
      assert.ok(board.move(0, 'x'));
    })

    it('returns false if it tries to move to a full column', () => {
      board = new Board();
      for (let i = 0; i < 6; i++) {
        board.move(0, 'x');
      }
      assert.ok(!board.move(0, 'x'));
    })
  })

  describe('.reset()', () => {
    it('resets a populated board to an empty one', () => {
      const testBoard = new Board();
      const emptytBoardObject = new Board();
      const emptyBoard = emptytBoardObject.board;

      testBoard.move(0, 'x');
      testBoard.move(0, 'y');
      testBoard.move(5, 'y');
      testBoard.reset();

      assert.deepStrictEqual(testBoard.board, emptyBoard)
    })
  })

  describe('.scan()', () => {
    it('returns an array of all scanned lines', () => {
      const board = new Board();

      scannedLines = board.scan();
      assert.ok(scannedLines.length === 44);
      assert.ok(scannedLines instanceof Array);
    })
  })

  describe('.clone()', () => {
    it('copies the current Board object and returns an identical, new Board object', () => {
      const board = new Board();

      board.move(0, 'x');
      board.move(1, 'y');
      board.move(2, 'y');

      const clone = board.clone();

      assert.deepStrictEqual(clone.board, board.board);
      clone.move(0, 'x');
      assert.notDeepStrictEqual(clone.board, board.board);
    })
  })
})