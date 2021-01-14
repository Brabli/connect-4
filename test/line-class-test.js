const assert = require('assert');
const Line = require('../src/line-class');
const coordMaker = require('../src/coord-maker');
const Board = require('../src/board-class');

describe('Line Class', () => {
  describe('Line', () => {
    it('returns a line object with the appropriate string and coordinates', () => {
      const line = new Line('--xy-', coordMaker("0001020304"), new Board());
      assert.deepStrictEqual(line.string, "--xy-");
      assert.deepStrictEqual(line.coords, [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);
      assert.ok(line instanceof Line);
    })
  })

  describe("emptyColumns", () => {
    it("holds an array of the line's empty spaces, whether they can be moved to or not", () => {
      const line = new Line("-x-y-", coordMaker(), new Board());
      const actualOutput = line.emptyColumns;
      const expectedOutput = [0, 2, 4];
      assert.deepStrictEqual(actualOutput, expectedOutput);
    })
  })

  describe("movableColumns", () => {
    it("holds an array of all the columns that can be moved to that will change the current line", () => {
      const line = new Line("-----", coordMaker(), new Board());
      const actualOutput = line.movableColumns;
      const expectedOutput = [0, 1, 2, 3, 4];
      assert.deepStrictEqual(actualOutput, expectedOutput);
    })
  })

  describe("winning", () => {
    describe("winningX", () => {
      it("returns true if the line contains four x's in a row", () => {
        const winningXLine = new Line("xxxx-", coordMaker(), new Board());
        const actualOutput = winningXLine.winningX;
        assert.ok(actualOutput);
      })

      it("returns false is the line does not contain four x's in a row", () => {
        const winningXLine = new Line("x-xxx", coordMaker(), new Board());
        const actualOutput = winningXLine.winningX;
        assert.ok(!actualOutput);
      })
    })

    describe("winningY", () => {
      it("returns true if the line contains four y's in a row", () => {
        const winningYLine = new Line("-yyyy", coordMaker(), new Board());
        const actualOutput = winningYLine.winningY;
        assert.ok(actualOutput);
      })

      it("returns false is the line does not contain four y's in a row", () => {
        const winningYLine = new Line("yy-yy", coordMaker(), new Board());
        const actualOutput = winningYLine.winningY;
        assert.ok(!actualOutput);
      })
    })
  })

  describe("winningCol", () => {
    describe("winningColX", () => {
      it("holds an array with a winning column number if a winning move can be made for x", () => {
        const line = new Line("x-xxy", coordMaker(), new Board());
        const actualOutput = line.winningColX;
        const expectedOutput = [1];
        assert.deepStrictEqual(actualOutput, expectedOutput);
      })

      it("holds an empty array if no winning move can be made for y", () => {
        const line = new Line("xx-yy", coordMaker(), new Board());
        const actualOutput = line.winningColX;
        const expectedOutput = [];
        assert.deepStrictEqual(actualOutput, expectedOutput);
      })
    })

    describe("winningColY", () => {
      it("holds an array with a winning column number if a winning move can be made for y", () => {
        const line = new Line("yyy--", coordMaker(), new Board());
        const actualOutput = line.winningColY;
        const expectedOutput = [3];
        assert.deepStrictEqual(actualOutput, expectedOutput);
      })

      it("holds an empty array if no winning move can be made for y", () => {
        const line = new Line("yx-yy", coordMaker(), new Board());
        const actualOutput = line.winningColY;
        const expectedOutput = [];
        assert.deepStrictEqual(actualOutput, expectedOutput);
      })
    })
  })

  describe("unblockableRowOfThree", () => {
    describe("unblockableRowOfThreeXCols", () => {
      it("holds an array with a column that can be moved to to form an unblockable row of three for x", () => {
        const line = new Line("-x-x-", coordMaker(), new Board());
        const actualOutput = line.unblockableRowOfThreeXColumn;
        const expectedOutput = [2];
        assert.deepStrictEqual(actualOutput, expectedOutput);
      })

      it("holds an empty array if no unblockable row of three can be made for x", () => {
        const line = new Line("x--x-", coordMaker(), new Board());
        const actualOutput = line.unblockableRowOfThreeXColumn;
        const expectedOutput = [];
        assert.deepStrictEqual(actualOutput, expectedOutput);
      })
    })
    // Note the coords are different here for testing reasons
    describe("unblockableRowOfThreeYCols", () => {
      it("holds an array with a column that can be moved to to form an unblockable row of three for y", () => {
        const line = new Line("-y-y-", coordMaker("5253545556"), new Board());
        const actualOutput = line.unblockableRowOfThreeYColumn;
        const expectedOutput = [4];
        assert.deepStrictEqual(actualOutput, expectedOutput);
      })

      it("holds an empty array if no unblockable row of three can be made for y", () => {
        const line = new Line("-----", coordMaker(), new Board());
        const actualOutput = line.unblockableRowOfThreeYColumn;
        const expectedOutput = [];
        assert.deepStrictEqual(actualOutput, expectedOutput);
      })
    })
  })

  describe("rowOfThree", () => {
    describe("rowOfThreeXColumns", () => {
      it("holds an array of columns that can be moved to to give a line three x's (not necessarily in a row)", () => {
        const line = new Line("--xx-", coordMaker(), new Board());
        const actualOutput = line.rowOfThreeXColumns;
        const expectedOutput = [0, 1, 4];
        assert.deepStrictEqual(actualOutput, expectedOutput);
      })
    
      it("holds an empty array of columns if a line cannot hold three x's that will be useful", () => {
        const line = new Line("y--x-", coordMaker(), new Board());
        const actualOutput = line.rowOfThreeXColumns;
        const expectedOutput = [];
        assert.deepStrictEqual(actualOutput, expectedOutput);
      })
    })

    describe("rowOfThreeYColumns", () => {
      it("holds an array of columns that can be moved to to give a line three y's (not necessarily in a row)", () => {
        const line = new Line("yy---", coordMaker(), new Board());
        const actualOutput = line.rowOfThreeYColumns;
        const expectedOutput = [2, 3, 4];
        assert.deepStrictEqual(actualOutput, expectedOutput);
      })
    
      it("holds an empty array of columns if a line cannot hold three y's that will be useful", () => {
        const line = new Line("y-yx-", coordMaker(), new Board());
        const actualOutput = line.rowOfThreeYColumns;
        const expectedOutput = []; 
        assert.deepStrictEqual(actualOutput, expectedOutput);
      })
    })

    describe("rowOfTwo", () => {
      describe("rowOfTwoXColumns", () => {
        it("holds an array of columns that can be moved to to give a line two x's (not necessarily in a row)", () => {
          const line = new Line("--x-y", coordMaker(), new Board());
          const actualOutput = line.rowOfTwoXColumns;
          const expectedOutput = [0, 1, 3];
          assert.deepStrictEqual(actualOutput, expectedOutput);
        })

        it("holds an empty array if a line cannot hold two x's that will be useful", () => {
          const line = new Line("y-x-y", coordMaker(), new Board());
          const actualOutput = line.rowOfTwoXColumns;
          const expectedOutput = [];
          assert.deepStrictEqual(actualOutput, expectedOutput);
        })
      })

      describe("rowOfTwoYColumns", () => {
        it("holds an array of columns that can be moved to to give a line two y's (not necessarily in a row)", () => {
          const line = new Line("y----", coordMaker(), new Board());
          const actualOutput = line.rowOfTwoYColumns;
          const expectedOutput = [1, 2, 3, 4];
          assert.deepStrictEqual(actualOutput, expectedOutput);
        })

        it("holds an empty array if a line cannot hold two y's that will be useful", () => {
          const line = new Line("-yx--", coordMaker(), new Board());
          const actualOutput = line.rowOfTwoYColumns;
          const expectedOutput = [];
          assert.deepStrictEqual(actualOutput, expectedOutput);
        })
      })
    })
    
  })


})


const gameboard = [ // |
  // ROW ->   then COL V
  //   0     1     2     3     4     5     6
    ['00', '01', '02', '03', '04', '05', '06'], // 0  
    ['10', '11', '12', '13', '14', '15', '16'], // 1  
    ['20', '21', '22', '23', '24', '25', '26'], // 2  
    ['30', '31', '32', '33', '34', '35', '36'], // 3  
    ['40', '41', '42', '43', '44', '45', '46'], // 4  
    ['50', '51', '52', '53', '54', '55', '56']  // 5  
  ];