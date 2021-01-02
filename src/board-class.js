const Line = require('./line-class');
// TODO Write tests for all these functions!
class Board {
  constructor() {
    this.board = [
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
    if (this.get(0, column) !== '-') {
      console.log(`Column ${column} is full!`);
      return false;
    }
    // Otherwise move and return true.
    for (let i = 5; i >= 0; i--) {
      if (this.get(i, column) === '-') {
        this.set(i, column, symbol);
        return true;
      }
    }
  }
  
  // Scans board creating an array of lines. If bool is true, console.log each line.
  scan(bool = false) {
    let rows = [], cols = [], diags = [];
    let lineString, lineCoords;
    // ROWS
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 3; c++) {
        lineString = this.board[r][c] + this.board[r][c + 1] + this.board[r][c + 2] + this.board[r][c + 3] + this.board[r][c + 4];
        lineCoords = [[r, c], [r, c + 1], [r, c + 2], [r, c + 3], [r, c + 4]];
        const line = new Line(lineString, lineCoords, this.board);
        if (bool) console.log(line);
        rows.push(line);
      }
    }
    // COLS
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 2; r++) {
        let lineString = this.board[r][c] + this.board[r + 1][c] + this.board[r + 2][c] + this.board[r + 3][c] + this.board[r + 4][c];
        lineCoords = [[r, c], [r + 1, c], [r + 2, c], [r + 3, c], [r + 4, c]]
        const line = new Line(lineString, lineCoords, this.board);
        if (bool) console.log(line);
        cols.push(line);
      }
    }
    // DIAGS BACK
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        lineString = this.board[r][c]+ this.board[r + 1][c + 1] + this.board[r + 2][c + 2] + this.board[r + 3][c + 3] + this.board[r + 4][c + 4];
        lineCoords = [[r, c], [r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3], [r + 4, c + 4]];
        const line = new Line(lineString, lineCoords, this.board);
        if (bool) console.log(line);
        diags.push(line);
      }
    }
    // DIAGS Front
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        lineString = this.board[r][c + 4] + this.board[r + 1][c + 3] + this.board[r + 2][c + 2] + this.board[r + 3][c + 1] + this.board[r + 4][c];
        lineCoords = [[r, c + 4], [r + 1, c + 3], [r + 2, c + 2], [r + 1, c + 1], [r + 4, c]];
        const line = new Line(lineString, lineCoords, this.board);
        if (bool) console.log(line);
        diags.push(line);
      }
    }
    return [...rows, ...cols, ...diags];
  }

  reset() {
    this.board = this.board.map(row => {
      return row.map(() => '-')
    })
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
  }
}
  
module.exports = Board;