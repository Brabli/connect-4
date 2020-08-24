const assert = require('assert');
const { Line, RowLine, ColLine, DiagLineBack, DiagLineFront } = require('../Line-Classes');
const coordMaker = require('../coord-maker');

describe('Line Classes', () => {
  describe('Line', () => {
    it('returns a line object with the appropriate string and coordinates', () => {
      const string = '--xy';
      const coords = coordMaker("00010203");

      line = new Line(string, coords);

      assert.equal(line.string, string);
      assert.equal(line.coords, coords);
    })

    it('marks the line as useful if it is not full or empty', () => {
      const usefulLine = 'x-xy';
      line = new Line(usefulLine, coordMaker("00010203"))
      assert.ok(line.useful)
    })

    it('marks the line as not useful if it is full', () => {
      const fullLine = 'xyxy';
      line = new Line(fullLine, coordMaker("00010203"))
      assert.ok(!line.useful)
    })

    it('marks the line as not useful if it is empty', () => {
      const emptyLine = '----';
      line = new Line(emptyLine, coordMaker("00010203"))
      assert.ok(!line.useful)
    })

    it('correctly returns an array of empty column indicies', () => {
      const string1 = 'x-y-';
      const string2 = '----';
      const string3 = '---x';
      const string4 = 'yyxx';

      const coords1 = coordMaker('00112233');
      const coords2 = coordMaker('03132333');
      const coords3 = coordMaker('15243342');
      const coords4 = coordMaker('11223344');
      
      const expectedOutput1 = [1, 3];
      const expectedOutput2 = [3];
      const expectedOutput3 = [5, 4, 3];
      const expectedOutput4 = [];

      line1 = new Line(string1, coords1);
      line2 = new Line(string2, coords2);
      line3 = new Line(string3, coords3);
      line4 = new Line(string4, coords4);

      assert.deepStrictEqual(line1.emptyColumns, expectedOutput1);
      assert.deepStrictEqual(line2.emptyColumns, expectedOutput2);
      assert.deepStrictEqual(line3.emptyColumns, expectedOutput3);
      assert.deepStrictEqual(line4.emptyColumns, expectedOutput4);
    })
  })

  describe('RowLine', () => {
    it('correctly tells when a line is on the edge of the board', () => {
      const topLeftEdge = coordMaker("00010203")
      const bottomLeftEdge = coordMaker("50515253");
      const middleRightEdge = coordMaker("23242526");

      line1 = new RowLine('----', topLeftEdge);
      line2 = new RowLine('----', bottomLeftEdge);
      line4 = new RowLine('----', middleRightEdge);
      
      assert.ok(line1.onEdge);
      assert.ok(line2.onEdge);
      assert.ok(line4.onEdge);
    })

    it('correctly tells when a line is not on the edge of the board', () => {
      const middleBottom = coordMaker("52535455");
      const middleTop = coordMaker("01020304");
      const middleBottomOffCentre = coordMaker("41424344");

      line1 = new RowLine('----', middleBottom);
      line2 = new RowLine('----', middleTop);
      line3 = new RowLine('----', middleBottomOffCentre);
      
      assert.ok(!line1.onEdge);
      assert.ok(!line2.onEdge);
      assert.ok(!line3.onEdge);
    })
  })

  describe('ColLine', () => {
    it('correctly tells when a line is on the edge of the board', () => {
      const topLeftEdge = coordMaker('00102030');
      const middleBottomEdge = coordMaker('23334353');
      const bottomRightEdge = coordMaker('26364656');

      line1 = new ColLine('----', topLeftEdge);
      line2 = new ColLine('----', middleBottomEdge);
      line3 = new ColLine('----', bottomRightEdge);

      assert.ok(line1.onEdge);
      assert.ok(line2.onEdge);
      assert.ok(line3.onEdge);
    })

    it('correctly tells when a line is not on the edge of the board', () => {
      const leftMiddle = coordMaker('10203040');
      const middleMiddle = coordMaker('13233343');
      const rightMiddle = coordMaker('16263646');

      line1 = new ColLine('----', leftMiddle);
      line2 = new ColLine('----', middleMiddle);
      line3 = new ColLine('----', rightMiddle);

      assert.ok(!line1.onEdge);
      assert.ok(!line2.onEdge);
      assert.ok(!line3.onEdge);
    })
  })

  describe('DiagLineBack', () => {
    it('correctly tells when a line is on the edge of the board', () => {
      const topLeft = coordMaker('00112233');
      const middleTop = coordMaker('02132435');
      const middleBottom = coordMaker('21324354');
      const bottomRight = coordMaker('22334455');

      line1 = new DiagLineBack('----', topLeft);
      line2 = new DiagLineBack('----', middleTop);
      line3 = new DiagLineBack('----', middleBottom);
      line4 = new DiagLineBack('----', bottomRight);

      assert.ok(line1.onEdge);
      assert.ok(line2.onEdge);
      assert.ok(line3.onEdge);
      assert.ok(line4.onEdge);
    })

    it('correctly tells when a line is not on the edge of the board', () => {
      const middleOne = coordMaker('11223344');
      const middleTwo = coordMaker('12233445');

      line1 = new DiagLineBack('----', middleOne);
      line2 = new DiagLineBack('----', middleTwo);

      assert.ok(!line1.onEdge);
      assert.ok(!line2.onEdge);
    })
  })

  describe('DiagLineFront', () => {
    it('correctly tells when a line is on the edge of the board', () => {
      const topRight = coordMaker('06152433');
      const middleTop = coordMaker('04132231');
      const middleBottom = coordMaker('24334251');
      const bottomLeft = coordMaker('23324150');

      line1 = new DiagLineFront('----', topRight);
      line2 = new DiagLineFront('----', middleTop);
      line3 = new DiagLineFront('----', middleBottom);
      line4 = new DiagLineFront('----', bottomLeft);

      assert.ok(line1.onEdge);
      assert.ok(line2.onEdge);
      assert.ok(line3.onEdge);
      assert.ok(line4.onEdge);
    })

    it('correctly tells when a line is not on the edge of the board', () => {
      const middleOne = coordMaker('11223344');
      const middleTwo = coordMaker('12233445');

      line1 = new DiagLineFront('----', middleOne);
      line2 = new DiagLineFront('----', middleTwo);

      assert.ok(!line1.onEdge);
      assert.ok(!line2.onEdge);
    })
  })
})

const gameboard = [
  // ROW then COL
  //  0    1    2    3    4    5    6
    ['A', '-', '-', '-', '-', '-', '0'], // 0  
    ['-', 'B', '-', '-', '-', '-', '1'], // 1  
    ['-', '-', 'C', '-', '-', '-', '2'], // 2  
    ['-', '-', '-', '-', '-', '-', '3'], // 3  
    ['-', '-', '-', '-', '-', '-', '4'], // 4  
    ['-', '-', '-', '-', '-', '-', '5']  // 5  
  ];