"use strict"

const Line = require('./line-class');

// TODO Write tests for all these functions!
class Board {
  constructor(board = null) {
    this.board = board || [
    // ROW then COL
    //  0    1    2    3    4    5    6
      ['-', '-', '-', '-', '-', '-', '-'], // 0  
      ['-', '-', '-', '-', '-', '-', '-'], // 1  
      ['-', '-', '-', '-', '-', '-', '-'], // 2  
      ['-', '-', '-', '-', '-', '-', '-'], // 3  
      ['-', '-', '-', '-', '-', '-', '-'], // 4  
      ['-', '-', '-', '-', '-', '-', '-']  // 5  
    ];
  }

  move(column, symbol) {
    // Returns false if specified column is full.
    if (this.get(0, column) !== '-') return false;
    // Otherwise move and return true.
    for (let row = 5; row >= 0; row--) {
      if (this.get(row, column) === '-') {
        this.set(row, column, symbol);
        return this;
      }
    }
  }
  
  // Scans board creating an array of line objects. If log is true, console.log each line.
  scan(log = false) {
    let rows = [], cols = [], diags = [];

    // ROWS
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 3; c++) {
        const lineString = this.get(r, c) + this.get(r, c + 1) + this.get(r, c + 2) + this.get(r, c + 3) + this.get(r, c + 4);
        const lineCoords = [[r, c], [r, c + 1], [r, c + 2], [r, c + 3], [r, c + 4]];
        rows.push( new Line(lineString, lineCoords, this) );
      }
    }
    // COLS
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 2; r++) {
        const lineString = this.get(r, c) + this.get(r + 1, c) + this.get(r + 2, c) + this.get(r + 3, c) + this.get(r + 4, c);
        const lineCoords = [[r, c], [r + 1, c], [r + 2, c], [r + 3, c], [r + 4, c]]
        cols.push( new Line(lineString, lineCoords, this) );
      }
    }
    // DIAGS BACK
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const lineString = this.get(r, c) + this.get(r + 1, c + 1) + this.get(r + 2, c + 2) + this.get(r + 3, c + 3) + this.get(r + 4, c + 4);
        const lineCoords = [[r, c], [r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3], [r + 4, c + 4]];
        diags.push( new Line(lineString, lineCoords, this) );
      }
    }
    // DIAGS Front
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const lineString = this.get(r,c + 4) + this.get(r + 1, c + 3) + this.get(r + 2, c + 2) + this.get(r + 3, c + 1) + this.get(r + 4, c);
        const lineCoords = [[r, c + 4], [r + 1, c + 3], [r + 2, c + 2], [r + 1, c + 1], [r + 4, c]];
        diags.push( new Line(lineString, lineCoords, this) );
      }
    }
    
    const allLines = [...rows, ...cols, ...diags];
    if (log) allLines.forEach(line => console.log(line));
    return allLines;
  }

  reset() {
    this.board = this.board.map(row => row.map(() => '-'))
  }

  show() {
    this.board.forEach(row => console.log(JSON.stringify(row)));
  }

  clone() {
    const clone = new Board();
    clone.board = JSON.parse(JSON.stringify(this.board));
    return clone;
  }

  get(row, col) {
    return this.board[row][col];
  }
  
  set(row, col, symbol) {
    this.board[row][col] = symbol;
    return this;
  }

  _checkForWinner() {
    const lines = this.scan();
    for (const line of lines) {
      if (line.winningX) return "x"
      if (line.winningY) return "y"
    }
    return false;
  }

  _checkForDraw() {
    if (this.board[0].every(s => s === "x" || s === "y")) return true;
    else return false
  }
}
  
module.exports = Board;