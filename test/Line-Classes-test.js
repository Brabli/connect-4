const assert = require('assert');
const Line = require('../Line-Classes');
const coordMaker = require('../coord-maker');
const Board = require('../board-class');
const { isString } = require('util'); // What was this for?

describe('Line Class', () => {
  describe('Line', () => {
    it('returns a line object with the appropriate string and coordinates', () => {
      const string = '--xy-';
      const coords = coordMaker("0001020304");

      const line = new Line(string, coords);

      assert.equal(line.string, string);
      assert.equal(line.coords, coords);
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

    describe('.winning', () => {
      it('marks a line as winning if it contains four of the same characters in a row', () => {
        const winningLineX = 'yxxxx';
        const winningLineY = 'yyyy-';

        const lineX = new Line(winningLineX, coordMaker("0011223344"));
        const lineY = new Line(winningLineY, coordMaker("0011223344"));

        assert.ok(lineX.winning);
        assert.ok(lineY.winning);
      })

      it('does not mark a line as winning if it contains four of the same characters but not next to each other', () => {
        const notWinningString = 'xxyxx';
        const notWinningLine = new Line(notWinningString, coordMaker("0011223344"));
        assert.ok(!notWinningLine.winning);
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

        assert.equal(colLine.movable, true);
        assert.equal(rowLine.movable, true);
        assert.equal(diagLine.movable, true);
      })

      it('returns false if no empty spaces in a line can be filled this turn', () => {
        const colLine = new Line('xxyxx', coordMaker('1020304050'), this.testboard);
        const rowLine = new Line('x-xxx', coordMaker('4243444546'), this.testboard);
        const diagLine = new Line('xxx-b', coordMaker('1625344352'), this.testboard);

        assert.equal(colLine.movable, false);
        assert.equal(rowLine.movable, false);
        assert.equal(diagLine.movable, false);
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