// Coords are always ROW then COL.
class Line { 
  constructor(string, coords, gameboard) {
    this.string = string;
    this.coords = coords;
    // Refers to specific coords
    this.coordA = coords[0];
    this.coordB = coords[1];
    this.coordC = coords[2];
    this.coordD = coords[3];
    this.coordE = coords[4];
    // Refers to specific string characters
    this.A = string[0];
    this.B = string[1];
    this.C = string[2];
    this.D = string[3];
    this.E = string[4];

    /* emptyColumns: An array of numbers representing which columns are open in the line. Returns an empty array if none. */
    this.emptyColumns = Line.getEmptyColumns(string, coords);
    
    /* useful: True if line is not completely full nor completely empty. */
    this.useful = false;
    if (!this.string.match(/(\w\w\w\w\w)|(-----)/)) this.useful = true;

    /* winning: True if string is 4 of the same characters in a row that aren't '----' */

    this.winningX = false;
    if (this.string.match(/xxxx/)) this.winningX = true;

    this.winningY = false;
    if (this.string.match(/yyyy/)) this.winningY = true;

    /* movable: True if any blank spaces can be immidiately moved to, false otherwise. */
    this.movable = false;
    this.movableColumns = [];
    // Loops once for each Line.string index
    for (let i = 0; i < 5; i++) {
      // If no gameboard provided, break loop. If current stringIndex is not "-", skip iter.
      if (!gameboard) break;
      if (this.string[i] !== '-') continue;
      let currentSquareCoords = this.coords[i];
      let underSquareCoords = [currentSquareCoords[0] + 1, currentSquareCoords[1]];
      if (currentSquareCoords[0] === 5) {
        this.movable = true;
        this.movableColumns.push(currentSquareCoords[1]);
        continue;
      }
      if (gameboard[underSquareCoords[0]][underSquareCoords[1]] !== '-') {
        this.movable = true;
        this.movableColumns.push(currentSquareCoords[1]);
      }
    }
    /* rowOfFourX:  */
    this.rowOfFourX = false;
    this.winningColX;
    if (this.string.match(Line.regexLineOfFourX)) {
      for (let i = 0; i < 5; i++) {
        if (this.string[i] === "-" && (this.string[i+1] === "x" || this.string[i-1] === "x")) {
          if (this.movableColumns.includes(this.coords[i][1])) {
            this.rowOfFourX = true;
            this.winningColX = this.coords[i][1];
            break;
          }
        }
      }
    }
    /* rowOfFourY:  */
    this.rowOfFourY = false;
    this.winningColY;
    if (this.string.match(Line.regexLineOfFourY)) {
      for (let i = 0; i < 5; i++) {
        if (this.string[i] === "-" && (this.string[i+1] === "y" || this.string[i-1] === "y")) {
          if (this.movableColumns.includes(this.coords[i][1])) {
            this.rowOfFourY = true;
            this.winningColY = this.coords[i][1];
            break;
          }
        }
      }
    }

    /* unblockableRowOfThreeX: -x-x- */
    this.unblockableRowOfThreeX = false;
    this.unblockableRowOfThreeXColumn;
    if (this.string === "-x-x-")  {
      const emptySquares = [this.coordA[1], this.coordC[1], this.coordE[1]];
      if (emptySquares.every(square => this.movableColumns.includes(square))) {
        this.unblockableRowOfThreeX = true;
        this.unblockableRowOfThreeXColumn = this.coordC[1];
      }
    }

    /* unblockableRowOfThreeY: -y-y- */
    this.unblockableRowOfThreeY = false;
    this.unblockableRowOfThreeYColumn;
    if (this.string === "-y-y-") {
      const emptySquares = [this.coordA[1], this.coordC[1], this.coordE[1]];
      if (emptySquares.every(square => this.movableColumns.includes(square))) {
        this.unblockableRowOfThreeY = true;
        this.unblockableRowOfThreeYColumn = this.coordC[1];
      }
    }

    /* rowOfThreeX:  */
    this.rowOfThreeX = false;
    this.rowOfThreeXColumns = [];
    if (this.string.match(Line.regexLineOfThreeX)) {
      for (let i = 0; i < 5; i++) {
        if (this.string[i] === "-") {
          if(this.movableColumns.includes(this.coords[i][1])) {
            this.rowOfThreeX = true;
            this.rowOfThreeXColumns.push(this.coords[i][1]);
          }
        }
      }
      this.rowOfThreeXColumns = [...new Set(this.rowOfThreeXColumns)];
    }

    /* rowOfThreeY:  */
    this.rowOfThreeY = false;
    this.rowOfThreeYColumns = [];
    if (this.string.match(Line.regexLineOfThreeY)) {
      for (let i = 0; i < 5; i++) {
        if (this.string[i] === "-") {
          if(this.movableColumns.includes(this.coords[i][1])) {
            this.rowOfThreeY = true;
            this.rowOfThreeYColumns.push(this.coords[i][1]);
          }
        }
      }
      this.rowOfThreeYColumns = [...new Set(this.rowOfThreeYColumns)];
    }

    /* rowOfTwoX:  */
    this.rowOfTwoX = false;
    this.rowOfTwoXColumns = [];
    if (this.string.match(Line.regexLineOfTwoX)) {
      for (let i = 0; i < 5; i++) {
        if (this.string[i] === "-") {
          if(this.movableColumns.includes(this.coords[i][1])) {
            this.rowOfTwoX = true;
            this.rowOfTwoXColumns.push(this.coords[i][1]);
          }
        }
      }
      this.rowOfTwoXColumns = [...new Set(this.rowOfTwoXColumns)];
    }

    /* rowOfTwoY:  */
    this.rowOfTwoY = false;
    this.rowOfTwoYColumns = [];
    if (this.string.match(Line.regexLineOfTwoY)) {
      for (let i = 0; i < 5; i++) {
        if (this.string[i] === "-") {
          if(this.movableColumns.includes(this.coords[i][1])) {
            this.rowOfTwoY = true;
            this.rowOfTwoYColumns.push(this.coords[i][1]);
          }
        }
      }
      this.rowOfTwoYColumns = [...new Set(this.rowOfTwoYColumns)];
    }
  }

  // STATIC PROPERTIES //
  /* Helper func used in this.emptyColumns */
  static getEmptyColumns(string, coords) {
    let emptyColumnIndicies = [];
    for (let i = 0; i < 5; i++) {
      if (string[i] !== '-') continue;
      emptyColumnIndicies.push(coords[i][1]);
    }
    return [...new Set(emptyColumnIndicies)];
  }

  // Regexs
  //static customLO4 = new RegExp(`.(${"-" + s + s + s}|${s + "-" + s + s}|${s + s + "-" + s}|${s + s + s + "-"})|(${"-" + s + s + s}|${s + "-" + s + s}|${s + s + "-" + s}|${s + s + s + "-"}).`)
  static regexLineOfFourX = /.(-xxx|x-xx|xx-x|xxx-)|(-xxx|x-xx|xx-x|xxx-)./;
  static regexLineOfFourY = /.(-yyy|y-yy|yy-y|yyy-)|(-yyy|y-yy|yy-y|yyy-)./;
  static regexLineOfThreeX = /((xx-|x-x|-xx)-.)|(.-(xx-|x-x|-xx))|(y|-)(x-x-|x--x|-x-x|-xx-)|(x-x-|x--x|(-|y)x-x|(-|y)xx-)(y|-)/;
  static regexLineOfThreeY = /((yy-|y-y|-yy)-.)|(.-(yy-|y-y|-yy))|(x|-)(y-y-|y--y|-y-y|-yy-)|(y-y-|y--y|(-|x)y-y|(-|x)yy-)(x|-)/;
  static regexLineOfTwoX = /(--x-(y|-)|(y|-)-x--)|yx---|---xy|y---x|x---y/;
  static regexLineOfTwoY = /(--y-(x|-)|(x|-)-y--)|xy---|---yx|x---y|y---x/;
}

module.exports = Line;