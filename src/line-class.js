// Coords are always ROW then COL.
class Line { 
  constructor(string, coords, board) {
    this.board = board;
    this.string = string;
    this.coords = coords;

    // emptyColumns: An array of numbers representing which columns are open in the line. Returns an empty array if none.
    this.emptyColumns = getEmptyColumns(string, coords);
    
    // useful: True if line is not completely full nor completely empty.
    this.useful = !(this.string.match(/(\w\w\w\w\w)|(-----)/));

    // movable: True if any blank spaces can be immidiately moved to, false otherwise.
    this.movable = getMovableColumns(this.string, this.coords, this.board).length !== 0;
    this.movableColumns = getMovableColumns(this.string, this.coords, this.board);

    // winning: True if string is 4 of the same characters in a row that aren't '----'.
    this.winningX = this.string.match(/xxxx/);
    this.winningY = this.string.match(/yyyy/);

    // rowOfFour: True if a winning move can be made
    this.rowOfFourX = testForLineOfFour("x", this.string, this.coords, this.movableColumns) !== null;
    this.winningColX = testForLineOfFour("x", this.string, this.coords, this.movableColumns);

    this.rowOfFourY = testForLineOfFour("y", this.string, this.coords, this.movableColumns) !== null;
    this.winningColY = testForLineOfFour("y", this.string, this.coords, this.movableColumns);
    
    // unblockableRowOfThree:
    this.unblockableRowOfThreeX = testForUnblockableRowOfThree("x", this.string, this.coords, this.movableColumns) !== null;
    this.unblockableRowOfThreeXColumn = testForUnblockableRowOfThree("x", this.string, this.coords, this.movableColumns);

    this.unblockableRowOfThreeY = testForUnblockableRowOfThree("y", this.string, this.coords, this.movableColumns) !== null;
    this.unblockableRowOfThreeYColumn = testForUnblockableRowOfThree("y", this.string, this.coords, this.movableColumns);

    this.rowOfThreeX = testForRowOfThree("x", this.string, this.coords, this.movableColumns).length !== 0;
    this.rowOfThreeXColumns = testForRowOfThree("x", this.string, this.coords, this.movableColumns); // Columns that can be moved to to form a row of three x's.

    this.rowOfThreeY = testForRowOfThree("y", this.string, this.coords, this.movableColumns).length !== 0;
    this.rowOfThreeYColumns = testForRowOfThree("y", this.string, this.coords, this.movableColumns);

    this.rowOfTwoX = testForRowOfTwo("x", this.string, this.coords, this.movableColumns).length !== 0;
    this.rowOfTwoXColumns = testForRowOfTwo("x", this.string, this.coords, this.movableColumns);

    this.rowOfTwoY = testForRowOfTwo("y", this.string, this.coords, this.movableColumns).length !== 0;
    this.rowOfTwoYColumns = testForRowOfTwo("y", this.string, this.coords, this.movableColumns);

    function getMovableColumns(lineString, coords, board) {
      const movableColumns = [];
      for (let i = 0; i < 5; i++) {
        let [currentRow, currentCol] = coords[i];
        if (lineString[i] !== '-') continue;
        if (currentRow === 5) {
          movableColumns.push(currentCol);
          continue;
        }
        // currentRow + 1 is the column space underneath the current space.
        if (board.get(currentRow + 1, currentCol) !== '-') movableColumns.push(currentCol);
      }
      return movableColumns;
    }
    
    function testForLineOfFour(s, lineString, coords, movableColumns) {
      let regex;
      if (s === "x") regex = Line.regexLineOfFourX;
      if (s === "y") regex = Line.regexLineOfFourY;
      if (string.match(regex)) {
        for (let i = 0; i < 5; i++) {
          if (lineString[i] === "-" && (lineString[i + 1] === s || lineString[i - 1] === s)) {
            if (movableColumns.includes(coords[i][1])) {
              return [coords[i][1]];
            }
          }
        }
      }
      return null;
    }

    /* unblockableRowOfThreeX: -x-x- */
    function testForUnblockableRowOfThree(s, lineString, coords, movableColumns) {
      if (lineString === "-" + s + "-" + s + "-") {
        const emptySquares = [coords[0][1], coords[2][1], coords[4][1]];
        if (emptySquares.every(square => movableColumns.includes(square))) return [coords[2][1]];
        else return null;
      }
    }
    
    function testForRowOfThree(s, lineString, coords, movableColumns) {
      let regex;
      const rowOfThreeCols = [];
      if (s === "x") regex = Line.regexLineOfThreeX;
      if (s === "y") regex = Line.regexLineOfThreeY;
      /* rowOfThreeX:  */
      if (lineString.match(regex)) {
        for (let i = 0; i < 5; i++) {
          if (lineString[i] === "-") {
            if (movableColumns.includes(coords[i][1])) {
              rowOfThreeCols.push(coords[i][1]);
            }
          }
        }
      }
      return [...new Set(rowOfThreeCols)];
    }

    function testForRowOfTwo(s, lineString, coords, movableColumns) {
      let regex;
      const rowOfTwoCols = [];
      if (s === "x") regex = Line.regexLineOfTwoX;
      if (s === "y") regex = Line.regexLineOfTwoY;
      if (lineString.match(regex)) {
        for (let i = 0; i < 5; i++) {
          if (lineString[i] === "-") {
            if(movableColumns.includes(coords[i][1])) {
              rowOfTwoCols.push(coords[i][1]);
            }
          }
        }
      }
      return [...new Set(rowOfTwoCols)];
    }

    function getEmptyColumns(string, coords) {
      let emptyColumnIndicies = [];
      for (let i = 0; i < 5; i++) {
        if (string[i] !== '-') continue;
        emptyColumnIndicies.push(coords[i][1]);
      }
      return [...new Set(emptyColumnIndicies)];
    }
  }

  static regexLineOfFourX = /.(-xxx|x-xx|xx-x|xxx-)|(-xxx|x-xx|xx-x|xxx-)./;
  static regexLineOfFourY = /.(-yyy|y-yy|yy-y|yyy-)|(-yyy|y-yy|yy-y|yyy-)./;
  static regexLineOfThreeX = /((xx-|x-x|-xx)-.)|(.-(xx-|x-x|-xx))|(y|-)(x-x-|x--x|-x-x|-xx-)|(x-x-|x--x|(-|y)x-x|(-|y)xx-)(y|-)/;
  static regexLineOfThreeY = /((yy-|y-y|-yy)-.)|(.-(yy-|y-y|-yy))|(x|-)(y-y-|y--y|-y-y|-yy-)|(y-y-|y--y|(-|x)y-y|(-|x)yy-)(x|-)/;
  static regexLineOfTwoX = /(--x-(y|-)|(y|-)-x--)|yx---|---xy|y---x|x---y/;
  static regexLineOfTwoY = /(--y-(x|-)|(x|-)-y--)|xy---|---yx|x---y|y---x/;
}

module.exports = Line;