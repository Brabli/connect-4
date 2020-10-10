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
    // Regexs
    this.regexLineOfFourX = /(y|-)(-xxx|x-xx|xx-x|xxx-)|(-xxx|x-xx|xx-x|xxx-)(y|-)/;
    this.regexLineOfFourY = /(x|-)(-yyy|y-yy|yy-y|yyy-)|(-yyy|y-yy|yy-y|yyy-)(x|-)/;
    this.regexLineOfThreeX = /((xx-|x-x|-xx)-.)|(.-(xx-|x-x|-xx))|(y|-)(x-x-|x--x|-x-x|-xx-)|(x-x-|x--x|(-|y)x-x|(-|y)xx-)(y|-)/;
    this.regexLineOfThreeY = /((yy-|y-y|-yy)-.)|(.-(yy-|y-y|-yy))|(x|-)(y-y-|y--y|-y-y|-yy-)|(y-y-|y--y|(-|x)y-y|(-|x)yy-)(x|-)/;
    this.regexLineOfTwoX = /(--x-(y|-)|(y|-)-x--)|yx---|---xy|y---x|x---y/;
    this.regexLineOfTwoY = /(--y-(x|-)|(x|-)-y--)|xy---|---yx|x---y|y---x/;


    /* emptyColumns: An array of numbers representing which columns are open in the line. Returns an empty array if none. */
    this.emptyColumns = getEmptyColumns(string, coords);
    
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

    this.rowOfFourX = false;

    /* unblockableRowOfThreeX: -xXx- */
    this.unblockableRowOfThreeX = false;
    this.unblockableRowOfThreeXColumn;
    if (this.string === "-x-x-" && this.movableColumns.includes(this.coordC[1])) {
      this.unblockableRowOfThreeX = true;
      this.unblockableRowOfThreeXColumn = this.coordC[1];
    }

    /* unblockableRowOfThreeY: -yYy- */
    this.unblockableRowOfThreeY = false;
    this.unblockableRowOfThreeYColumn;
    if (this.string === "-y-y-" && this.movableColumns.includes(this.coordC[1])) {
      this.unblockableRowOfThreeY = true;
      this.unblockableRowOfThreeYColumn = this.coordC[1];
    }

    
    this.rowOfThreeX = false;
    this.rowOfThreeXColumns = [];
    if (this.string.match(this.regexLineOfThreeX)) {
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

    this.rowOfThreeY = false;
    this.rowOfThreeYColumns = [];
    if (this.string.match(this.regexLineOfThreeY)) {
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


    this.rowOfTwoX = false;
    this.rowOfTwoXColumns = [];
    if (this.string.match(this.regexLineOfTwoX)) {
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

    this.rowOfTwoY = false;
    this.rowOfTwoYColumns = [];
    
    if (this.string.match(this.regexLineOfTwoY)) {
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

  // This will eventually be able to filter out certain line objects from an array of line objects
  filter(arrayOfLines) {
    return null;
  }
}


/* Helper Func */
const getEmptyColumns = (string, coords) => {
  let emptyColumnIndicies = [];
  for (let i = 0; i < 5; i++) {
    if (string[i] !== '-') continue;
    emptyColumnIndicies.push(coords[i][1]);
  }
  // Filters duplicates
  emptyColumnIndicies = new Set(emptyColumnIndicies);
  emptyColumnIndicies = Array.from(emptyColumnIndicies);
  return emptyColumnIndicies;
}

module.exports = Line;