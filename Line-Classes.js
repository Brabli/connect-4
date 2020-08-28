// Coords are always ROW then COL
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
    for (let i = 0; i < 5; i++) {
      if (!gameboard) break;
      if (this.string[i] === '-') {
        if (this.coords[i][0] === 5) {
          this.movable = true;
          break;
        }
        let squareCoords = this.coords[i];
        let underSquareCoords = [squareCoords[0] + 1, squareCoords[1]];
        // Debugging
        // console.log(`Square Coords: ${this.coords[i]}`);
        // console.log(`Under Coords: ${underSquareCoords}`);

        try {
            if (gameboard[underSquareCoords[0]][underSquareCoords[1]] !== '-') {
              this.movable = true;
              break;
            } else {
              continue;
            }
        } catch(err) {
          if (err instanceof TypeError) continue;
          console.log(err);
          break;
        }
      }
    }
    // movableCols []
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