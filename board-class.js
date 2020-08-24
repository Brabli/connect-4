const { RowLine, ColLine, DiagLineBack, DiagLineFront } = require('./Line-Classes');

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
    // Returns false if specified column is full
    if (this.board[0][column] !== '-') {
      console.log(`Column ${column} is full!`);
      return false;
    }
    // Checks bottom row for empty space
    if (this.board[5][column] === '-') {
      this.board[5][column] = symbol;
      return true;
    }
    // Finds appropriate empty space
    for (let i = 4; i >= 0; i--) {
      if (this.board[i][column] === '-') {
        this.board[i][column] = symbol;
        return true;
      }
    }
  }

  scan() {
    let rows = [], cols = [], diags = [];
    let lineString, lineCoords;
    // ROWS
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        lineString = this.board[r][c] + this.board[r][c + 1] + this.board[r][c + 2] + this.board[r][c + 3];
        lineCoords = [[r, c], [r, c + 1], [r, c + 2], [r, c + 3]]
        line = new RowLine(lineString, lineCoords)
        //console.log(line)
        rows.push(line);
      }
    }
    // COLS
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 3; r++) {
        let lineString = this.board[r][c] + this.board[r + 1][c] + this.board[r + 2][c] + this.board[r + 3][c];
        lineCoords = [[r, c], [r + 1, c], [r + 2, c], [r + 3, c]]
        line = new ColLine(lineString, lineCoords)
        //console.log(line)
        cols.push(line);
      }
    }
    // DIAGS BACK
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        lineString = this.board[r][c] + this.board[r + 1][c + 1] + this.board[r + 2][c + 2] + this.board[r + 3][c + 3];
        lineCoords = [[r, c], [r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3]]
        line = new DiagLineBack(lineString, lineCoords)
        //console.log(line)
        diags.push(line);
      }
    }
    // DIAGS Front
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        lineString = this.board[r][c + 3] + this.board[r + 1][c + 2] + this.board[r + 2][c + 1] + this.board[r + 3][c];
        lineCoords = [[r, c + 3], [r + 1, c + 2], [r + 2, c + 1], [r, c + 3]]
        line = new DiagLineFront(lineString, lineCoords)
        //console.log(line)
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
  };


  clone() {
    const clone = new Board();
    clone.board = JSON.parse(JSON.stringify(this.board));
    return clone;
  }
}
  
module.exports = Board;