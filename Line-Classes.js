// Coords are always ROW then COL.
class Line { 
  constructor(string, coords, gameboard) {
    this.string = string;
    this.coords = coords;
    // Represents a perticular square coord
    this.A = coords[0];
    this.B = coords[1];
    this.C = coords[2];
    this.D = coords[3];
    this.E = coords[4];
    // emptyColumns: An array of numbers representing which columns are open in the line. Returns an empty array if none.
    this.emptyColumns = getEmptyColumns(string, coords);
    
    // useful: True if line is not completely full nor completely empty.
    if (!this.string.match(/(\w\w\w\w\w)|(-----)/)) {
      this.useful = true;
    } else {
      this.useful = false;
    }
    // winning: True if string is 4 of the same characters in a row that aren't '----'
    if (this.string.match(/(xxxx)|(yyyy)/)) {
      this.winning = true;
    } else {
      this.winning = false;
    }

    // movable: True if any blank spaces can be immidiately moved to, false otherwise.
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

    this.unblockableRowOfThree = false;
    if (this.string) null;

  }
  // This will eventually be able to filter out certain line objects from an array of line objects
  filter(arrayOfLines) {
    return null;
  }
}







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