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
    // emptyColumns: An array of numbers representing which columns are open in the line.
    this.emptyColumns = getEmptyColumns(string, coords);
    
    // useful: True if line is not completely full nor completely empty
    if (this.string === '----' || this.string.match(/[x|y][x|y][x|y][x|y]/)) {
      this.useful = false;
    } else {
      this.useful = true;
    }
    // winning: True if string is 4 of the same characters in a row that aren't '----'
    if (this.string === 'xxxx' || this.string === 'yyyy') {
      this.winning = true;
    } else {
      this.winning = false;
    }
    // movable or immidiatelyMovable
    // movableCols []

  }
    filter(arrayOfLines) {

  }
}

const getEmptyColumns = (string, coords) => {
  let emptyColumnIndicies = [];
  for (let i = 0; i < 4; i++) {
    if (string[i] !== '-') continue;
    emptyColumnIndicies.push(coords[i][1]);
  }
  // Filters duplicates
  emptyColumnIndicies = new Set(emptyColumnIndicies);
  emptyColumnIndicies = Array.from(emptyColumnIndicies);
  return emptyColumnIndicies;
}

class RowLine extends Line {
  constructor(string, coords) {
    super(string, coords);
    this.row = this.A[0]; // ?
    // If A's col value is 0 or D's col value is 6: onEdge is TRUE
    if (this.A[1] === 0 || this.D[1] === 6) {
      this.onEdge = true;
    } else {
      this.onEdge = false;
    }
  }
}

class ColLine extends Line {
  constructor(string, coords) {
    super(string, coords);
    this.col = this.A[1]
    // If A's row values is 0 or D's row value is 5: onEdge is TRUE
    if (this.A[0] === 0 || this.D[0] === 5) {
      this.onEdge = true;
    } else {
      this.onEdge = false;
    }
  }
}

class DiagLineBack extends Line {
  constructor(string, coords) {
    super(string, coords);
    // If A's col or row is 0: onEdge is TRUE
    if (this.A[0] === 0 || this.A[1] === 0) {
      this.onEdge = true;
    // If D's row is 5 or col is 6: onEdge is TRUE
    } else if (this.D[0] === 5 || this.D[1] === 6) {
      this.onEdge = true;
    } else {
      this.onEdge = false;
    }
  }
}

class DiagLineFront extends Line {
  constructor(string, coords) {
    super(string, coords);
    // If A's col is 0 or row is 6: onEdge is TRUE
    if (this.A[0] === 0 || this.A[1] === 6) {
      this.onEdge = true;
    // If D's row is 5 or col is 0: onEdge is TRUE
    } else if (this.D[0] === 5 || this.D[1] === 0) {
      this.onEdge = true;
    } else {
      this.onEdge = false;
    }
  }
}




module.exports = { Line, RowLine, ColLine, DiagLineBack, DiagLineFront };