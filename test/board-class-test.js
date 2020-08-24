const assert = require('assert');
const Board = require('../board-class');

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

  describe('reset', () => {
    it('resets a populated board to an empty one', () => {
      board = new Board();
      board.move(0, 'x');
      board.move(0, 'y');
      board.move(5, 'y');

      outputBoard = new Board();
      expectedOutput = outputBoard.board;

      board.reset();
      assert.deepStrictEqual(board.board, expectedOutput)
    })
  })

  describe('scan', () => {
    it('returns an array of all scanned lines', () => {
      const board = new Board();

      scannedLines = board.scan();
      assert.ok(scannedLines.length === 69);
    })
  })

  describe('clone', () => {
    it('copies Board object and returns an identical Board object', () => {
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