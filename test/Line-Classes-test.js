const assert = require('assert');
const Line = require('../Line-Classes');
const coordMaker = require('../coord-maker');
const Board = require('../board-class');
// const { isString } = require('util'); // What was this for?

describe('Line Class', () => {
  describe('Line', () => {
    it('returns a line object with the appropriate string and coordinates', () => {
      const string = '--xy-';
      const coords = coordMaker("0001020304");

      const line = new Line(string, coords);

      assert.strictEqual(line.string, string);
      assert.strictEqual(line.coords, coords);
      assert.ok(line instanceof Line);
    })

    describe('.useful', () => {
      it('marks useful as true if the line contains both empty and full spaces x-x-x', () => {
        const usefulLine = 'x-xy-';
        const line = new Line(usefulLine, coordMaker("0001020304"));
        assert.ok(line.useful);
      })
  
      it('marks useful as false if the line is full xxxxx', () => {
        const fullLine = 'xyxyy';
        const line = new Line(fullLine, coordMaker("0001020304"));
        assert.ok(!line.useful);
      })
  
      it('marks useful as false if the line is empty -----', () => {
        const emptyLine = '-----';
        const line = new Line(emptyLine, coordMaker("0001020304"));
        assert.ok(!line.useful);
      })
    })

    describe('.winningX', () => {
      it('marks a line as winning if it contains four x\'s in a row', () => {
        const winningLineA = 'yxxxx';
        const winningLineB = 'xxxx-';

        const lineA = new Line(winningLineA, coordMaker("0011223344"));
        const lineB = new Line(winningLineB, coordMaker("0011223344"));

        assert.ok(lineA.winningX);
        assert.ok(lineB.winningX);
      })

      it('does not mark a line as winning if it contains four of the same characters but not next to each other', () => {
        const notWinningString = 'xxyxx';
        const notWinningLine = new Line(notWinningString, coordMaker("0011223344"));
        assert.ok(!notWinningLine.winningX);
      })
    })
    describe('.winningY', () => {
      it('marks a line as winning if it contains four y\'s in a row', () => {
        const winningLineA = '-yyyy';
        const winningLineB = 'yyyyx';

        const lineA = new Line(winningLineA, coordMaker("0011223344"));
        const lineB = new Line(winningLineB, coordMaker("0011223344"));

        assert.ok(lineA.winningY);
        assert.ok(lineB.winningY);
      })

      it('does not mark a line as winning if it contains four of the same characters but not next to each other', () => {
        const notWinningString = 'yyy-y';
        const notWinningLine = new Line(notWinningString, coordMaker("0011223344"));
        assert.ok(!notWinningLine.winningY);
      })
    })

    describe('.emptyColumns', () => {
      it('returns an array of empty column indicies', () => {
        const string1 = 'x-y--';
        const string2 = '-----';
        const string3 = '---x-';
        const string4 = '-----';
  
        const coords1 = coordMaker('0011223344');
        const coords2 = coordMaker('0313233343');
        const coords3 = coordMaker('1524334251');
        const coords4 = coordMaker('0615243342');
        
        const expectedOutput1 = [1, 3, 4];
        const expectedOutput2 = [3];
        const expectedOutput3 = [5, 4, 3, 1];
        const expectedOutput4 = [6, 5, 4, 3, 2];
  
        const line1 = new Line(string1, coords1);
        const line2 = new Line(string2, coords2);
        const line3 = new Line(string3, coords3);
        const line4 = new Line(string4, coords4);
  
        assert.deepStrictEqual(line1.emptyColumns, expectedOutput1);
        assert.deepStrictEqual(line2.emptyColumns, expectedOutput2);
        assert.deepStrictEqual(line3.emptyColumns, expectedOutput3);
        assert.deepStrictEqual(line4.emptyColumns, expectedOutput4);
      })

      it('returns false if no free columns are available', () => {
        const fullString = 'xxyxy';
        const line = new Line(fullString, coordMaker('0011223344'));
        assert.deepStrictEqual(line.emptyColumns, []);
      })

      it('filters duplicate columns', () => {
        const fullString = 'xx---';
        const line = new Line(fullString, coordMaker('1424344454'));
        const expectedOutput = [4];
        assert.deepStrictEqual(line.emptyColumns, expectedOutput);
      })
    })

    describe('movable', () => {
      beforeEach(() => {
        this.testboard = [
          // ROW then COL
          //  0    1    2    3    4    5    6
            ['-', '-', '-', '-', '-', '-', '-'], // 0  
            ['x', '-', '-', '-', '-', '-', 'x'], // 1  
            ['x', '-', '-', '-', '-', 'x', 'x'], // 2  
            ['y', '-', '-', '-', 'x', 'x', 'x'], // 3  
            ['x', '-', 'x', '-', 'x', 'x', 'x'], // 4  
            ['x', '-', 'b', '-', 'c', 'd', 'e']  // 5  
          ];
      })

      it('returns true if an empty space can be filled next turn', () => {
        const colLine = new Line('-xxyx', coordMaker('0010203040'), this.testboard);
        const rowLine = new Line('x-x-x', coordMaker('5051525354'), this.testboard);
        const diagLine = new Line('x---c', coordMaker('1021324354'), this.testboard);

        assert.strictEqual(colLine.movable, true);
        assert.strictEqual(rowLine.movable, true);
        assert.strictEqual(diagLine.movable, true);
      })

      it('returns false if no empty spaces in a line can be filled this turn', () => {
        const colLine = new Line('xxyxx', coordMaker('1020304050'), this.testboard);
        const rowLine = new Line('x-xxx', coordMaker('4243444546'), this.testboard);
        const diagLine = new Line('xxx-b', coordMaker('1625344352'), this.testboard);

        assert.strictEqual(colLine.movable, false);
        assert.strictEqual(rowLine.movable, false);
        assert.strictEqual(diagLine.movable, false);
      })
      // 'Immidiately movable' meaning player can fill that space in one move.
      it('sets movableColumns to an array of all immidiately movable columns', () => {
        const colLine = new Line('-xxyx', coordMaker('0010203040'), this.testboard);
        const rowLine = new Line('x-x-x', coordMaker('5051525354'), this.testboard);
        const diagLine = new Line('x---c', coordMaker('1021324354'), this.testboard);
        
        assert.deepStrictEqual(colLine.movableColumns, [0]);
        assert.deepStrictEqual(rowLine.movableColumns, [1, 3]);
        assert.deepStrictEqual(diagLine.movableColumns, [2]);
      })
    })

    describe('unblockableRowOfThreeX', () => {
      it("Is set to true if an unblockable row of three can be created in one move for x", () => {
      const testboard = [
          // ROW then COL
          //  0    1    2    3    4    5    6
            ['-', '-', '-', '-', '-', '-', '-'], // 0  
            ['-', 'x', '-', '-', '-', '-', '-'], // 1  
            ['-', '-', '-', 'x', '-', '-', '-'], // 2  
            ['-', '-', '-', 'x', '-', '-', 'x'], // 3  
            ['-', 'x', '-', 'y', '-', '-', 'x'], // 4  
            ['-', 'x', '-', 'x', '-', '-', 'x']  // 5  
          ];

        const rowLine = new Line('-x-x-', coordMaker('5051525354'), testboard);
        const diagLine = new Line('-x-x-', coordMaker('0011223344'), testboard);

        assert.strictEqual(rowLine.unblockableRowOfThreeX, true);
        assert.strictEqual(rowLine.unblockableRowOfThreeXColumn, 2);
        assert.strictEqual(diagLine.unblockableRowOfThreeX, false);
        assert.strictEqual(diagLine.unblockableRowOfThreeXColumn, undefined);

      })
    })

    describe('unblockableRowOfThreeY', () => {
      it("Is set to true if an unblockable row of three can be created in one move for y", () => {
      const testboard = [
          // ROW then COL
          //  0    1    2    3    4    5    6
            ['-', '-', '-', '-', '-', '-', '-'], // 0  
            ['-', 'y', '-', '-', '-', '-', '-'], // 1  
            ['-', '-', '-', 'y', '-', '-', '-'], // 2  
            ['-', '-', '-', 'y', '-', '-', 'x'], // 3  
            ['-', 'x', '-', 'y', '-', '-', 'x'], // 4  
            ['-', 'y', '-', 'y', '-', '-', 'x']  // 5  
          ];

        const rowLine = new Line('-y-y-', coordMaker('5051525354'), testboard);
        const diagLine = new Line('-y-y-', coordMaker('0011223344'), testboard);

        assert.strictEqual(rowLine.unblockableRowOfThreeY, true);
        assert.strictEqual(diagLine.unblockableRowOfThreeY, false);

      })
    })

    describe('rowOfThreeX', () => {
      it('is set to true if a row of three x\'s can be made on one move', () => {
        const testboard = [
          // ROW then COL
          //  0    1    2    3    4    5    6
            ['-', 'y', '-', '-', '-', '-', '-'], // 0  
            ['-', '-', '-', '-', '-', '-', '-'], // 1  
            ['-', '-', 'y', 'x', '-', '-', '-'], // 2  
            ['-', '-', '-', '-', '-', '-', '-'], // 3  
            ['x', '-', '-', '-', 'x', 'x', '-'], // 4  
            ['x', '-', 'x', '-', 'x', '-', '-']  // 5  
          ];
        
        const colLine = new Line('---xx', coordMaker('1020304050'), testboard);
        const rowLine = new Line('x-x-x', coordMaker('5051525354'), testboard);
        const diagLine = new Line('y-x-x', coordMaker('0112233445'), testboard);
        
        assert.strictEqual(colLine.rowOfThreeX, true);
        assert.strictEqual(rowLine.rowOfThreeX, true);
        assert.strictEqual(diagLine.rowOfThreeX, true);
        assert.deepStrictEqual(colLine.rowOfThreeXColumns, [0]);
        assert.deepStrictEqual(rowLine.rowOfThreeXColumns, [1, 3]);
        assert.deepStrictEqual(diagLine.rowOfThreeXColumns, [2, 4]);
      })

      it('is set to false if the conditions are not met', () => {
        const testboard = [
          // ROW then COL
          //  0    1    2    3    4    5    6
            ['-', 'y', '-', '-', '-', '-', '-'], // 0  
            ['-', '-', '-', '-', '-', '-', '-'], // 1  
            ['-', '-', '-', 'x', '-', '-', '-'], // 2  
            ['y', '-', '-', '-', '-', '-', '-'], // 3  
            ['x', '-', '-', '-', '-', 'x', '-'], // 4  
            ['x', '-', 'x', 'y', 'x', '-', '-']  // 5  
          ];

        const colLine = new Line('--yxx', coordMaker('1020304050'), testboard);
        const rowLine = new Line('x-xyx', coordMaker('5051525354'), testboard);
        const diagLine = new Line('y-x-x', coordMaker('0112233445'), testboard);
        
        assert.strictEqual(colLine.rowOfThreeX, false);
        assert.strictEqual(rowLine.rowOfThreeX, false);
        assert.strictEqual(diagLine.rowOfThreeX, false);
        assert.deepStrictEqual(colLine.rowOfThreeXColumns, []);
        assert.deepStrictEqual(rowLine.rowOfThreeXColumns, []);
        assert.deepStrictEqual(diagLine.rowOfThreeXColumns, []);
      })
    })

    describe('rowOfThreeY', () => {
      it('is set to true if a row of three y\'s can be made on one move', () => {
        const testboard = [
          // ROW then COL
          //  0    1    2    3    4    5    6
            ['-', 'x', '-', '-', '-', '-', '-'], // 0  
            ['-', '-', '-', '-', '-', '-', '-'], // 1  
            ['-', '-', 'y', 'y', '-', '-', '-'], // 2  
            ['-', '-', '-', '-', '-', '-', '-'], // 3  
            ['y', '-', '-', '-', 'y', 'y', '-'], // 4  
            ['y', '-', 'y', '-', 'y', '-', '-']  // 5  
          ];
        
        const colLine = new Line('---yy', coordMaker('1020304050'), testboard);
        const rowLine = new Line('y-y-y', coordMaker('5051525354'), testboard);
        const diagLine = new Line('x-y-y', coordMaker('0112233445'), testboard);
        
        assert.strictEqual(colLine.rowOfThreeY, true);
        assert.strictEqual(rowLine.rowOfThreeY, true);
        assert.strictEqual(diagLine.rowOfThreeY, true);
      })

      it('is set to false if the conditions are not met', () => {
        const testboard = [
          // ROW then COL
          //  0    1    2    3    4    5    6
            ['-', 'x', '-', '-', '-', '-', '-'], // 0  
            ['-', '-', '-', '-', '-', '-', '-'], // 1  
            ['-', '-', '-', 'y', '-', '-', '-'], // 2  
            ['x', '-', '-', '-', '-', '-', '-'], // 3  
            ['y', '-', '-', '-', '-', 'y', '-'], // 4  
            ['y', '-', 'y', 'x', 'y', '-', '-']  // 5  
          ];

        const colLine = new Line('--xyy', coordMaker('1020304050'), testboard);
        const rowLine = new Line('y-yxy', coordMaker('5051525354'), testboard);
        const diagLine = new Line('x-y-y', coordMaker('0112233445'), testboard);
        
        assert.strictEqual(colLine.rowOfThreeY, false);
        assert.strictEqual(rowLine.rowOfThreeY, false);
        assert.strictEqual(diagLine.rowOfThreeY, false);
        assert.deepStrictEqual(colLine.rowOfThreeXColumns, []);
        assert.deepStrictEqual(rowLine.rowOfThreeXColumns, []);
        assert.deepStrictEqual(diagLine.rowOfThreeXColumns, []);
      })
    })

    describe('rowOfTwoX', () => {
      it("is set to true if a row of two can be made in one move", () => {
        const testboard = [
          // ROW then COL
          //  0    1    2    3    4    5    6
            ['-', 'x', '-', '-', '-', '-', '-'], // 0  
            ['-', '-', '-', '-', '-', '-', '-'], // 1  
            ['-', '-', 'x', '-', '-', '-', '-'], // 2  
            ['x', '-', '-', '-', '-', '-', '-'], // 3  
            ['y', '-', '-', '-', '-', 'y', '-'], // 4  
            ['y', '-', 'y', 'x', '-', '-', '-']  // 5  
          ];
        
        const colLine = new Line('---xy', coordMaker('0010203040'), testboard);
        const rowLine = new Line('yx---', coordMaker('5253545556'), testboard);
        const diagLine = new Line('x---y', coordMaker('0112233445'), testboard);
 
        assert.strictEqual(colLine.rowOfTwoX, true);
        assert.strictEqual(rowLine.rowOfTwoX, true);
        assert.strictEqual(diagLine.rowOfTwoX, true);
        assert.deepStrictEqual(colLine.rowOfTwoXColumns, [0]);
        assert.deepStrictEqual(rowLine.rowOfTwoXColumns, [4, 5, 6]);
        assert.deepStrictEqual(diagLine.rowOfTwoXColumns, [2]);
      })

      it("is set to false is the conditions are not met", () => {
        const testboard = [
          // ROW then COL
          //  0    1    2    3    4    5    6
            ['-', 'x', '-', '-', '-', '-', '-'], // 0  
            ['-', '-', '-', '-', '-', '-', '-'], // 1  
            ['x', '-', '-', '-', '-', '-', '-'], // 2  
            ['x', '-', '-', '-', '-', '-', '-'], // 3  
            ['y', '-', '-', '-', '-', 'y', '-'], // 4  
            ['y', '-', 'y', 'x', '-', '-', 'x']  // 5  
          ];
        
        const colLine = new Line('--xxy', coordMaker('0010203040'), testboard);
        const rowLine = new Line('yx--x', coordMaker('5253545556'), testboard);
        const diagLine = new Line('x---y', coordMaker('0112233445'), testboard);
 
        assert.strictEqual(colLine.rowOfTwoX, false);
        assert.strictEqual(rowLine.rowOfTwoX, false);
        assert.strictEqual(diagLine.rowOfTwoX, false);
        assert.deepStrictEqual(colLine.rowOfTwoXColumns, []);
        assert.deepStrictEqual(rowLine.rowOfTwoXColumns, []);
        assert.deepStrictEqual(diagLine.rowOfTwoXColumns, []);
      })       
    })

    describe('rowOfTwoY', () => {
      it("is set to true if a row of two can be made in one move", () => {
        const testboard = [
          // ROW then COL
          //  0    1    2    3    4    5    6
            ['-', 'y', '-', '-', '-', '-', '-'], // 0  
            ['-', '-', '-', '-', '-', '-', '-'], // 1  
            ['-', '-', 'x', '-', '-', '-', '-'], // 2  
            ['y', '-', '-', '-', '-', '-', '-'], // 3  
            ['x', '-', '-', '-', '-', 'x', '-'], // 4  
            ['y', '-', 'x', 'y', '-', '-', '-']  // 5  
          ];
        
        const colLine = new Line('---yx', coordMaker('0010203040'), testboard);
        const rowLine = new Line('xy---', coordMaker('5253545556'), testboard);
        const diagLine = new Line('y---x', coordMaker('0112233445'), testboard);
 
        assert.strictEqual(colLine.rowOfTwoY, true);
        assert.strictEqual(rowLine.rowOfTwoY, true);
        assert.strictEqual(diagLine.rowOfTwoY, true);
        assert.deepStrictEqual(colLine.rowOfTwoYColumns, [0]);
        assert.deepStrictEqual(rowLine.rowOfTwoYColumns, [4, 5, 6]);
        assert.deepStrictEqual(diagLine.rowOfTwoYColumns, [2]);
      })

      it("is set to false is the conditions are not met", () => {
        const testboard = [
          // ROW then COL
          //  0    1    2    3    4    5    6
            ['-', 'y', '-', '-', '-', '-', '-'], // 0  
            ['-', '-', '-', '-', '-', '-', '-'], // 1  
            ['y', '-', '-', '-', '-', '-', '-'], // 2  
            ['y', '-', '-', '-', '-', '-', '-'], // 3  
            ['x', '-', '-', '-', '-', 'x', '-'], // 4  
            ['y', '-', 'x', 'y', '-', '-', 'y']  // 5  
          ];
        
        const colLine = new Line('--yyx', coordMaker('0010203040'), testboard);
        const rowLine = new Line('xy--y', coordMaker('5253545556'), testboard);
        const diagLine = new Line('y---x', coordMaker('0112233445'), testboard);
 
        assert.strictEqual(colLine.rowOfTwoY, false);
        assert.strictEqual(rowLine.rowOfTwoY, false);
        assert.strictEqual(diagLine.rowOfTwoY, false);
        assert.deepStrictEqual(colLine.rowOfTwoYColumns, []);
        assert.deepStrictEqual(rowLine.rowOfTwoYColumns, []);
        assert.deepStrictEqual(diagLine.rowOfTwoYColumns, []);
      })       
    })
  })
})

const gameboard = [
  // ROW then COL
  //   0     1     2     3     4     5     6
    ['00', '01', '02', '03', '04', '05', '06'], // 0  
    ['10', '11', '12', '13', '14', '15', '16'], // 1  
    ['20', '21', '22', '23', '24', '25', '26'], // 2  
    ['30', '31', '32', '33', '34', '35', '36'], // 3  
    ['40', '41', '42', '43', '44', '45', '46'], // 4  
    ['50', '51', '52', '53', '54', '55', '56']  // 5  
  ];