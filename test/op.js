var should = require('should');
var lar = require('../lib/lar.js').lar;

describe('op', function () {
  describe('extract', function () {
    it('should extract vertices from one edge', function () {
      var cells = [[0,1]];
      var expected =  [[0],[1]];
      var extractedCells = lar.op.extract(cells);
      
      extractedCells.should.eql(expected);
    });

    it('should extract edges from one triangle', function () {
      var cells = [[0,1,2]];
      var expected =  [[0,1],[0,2],[1,2]];
      var extractedCells = lar.op.extract(cells);
      
      extractedCells.should.eql(expected);
    });

    it('should extract edges from two triangles', function () {
      var cells = [[0,1,3],[1,2,3]];
      var expected =  [[0,1],[0,3],[1,2],[1,3],[2,3]];
      var extractedCells = lar.op.extract(cells);
      
      extractedCells.should.eql(expected);
    });

    it('should extract triangles from one tetrahedron', function () {
      var cells = [[0,1,2,3]];
      var expected =  [[0,1,2],[0,1,3],[0,2,3],[1,2,3]];
      var extractedCells = lar.op.extract(cells);
      
      extractedCells.should.eql(expected);
    });
  });

  describe('extrude', function () { ; });

  describe('combine', function () { ; });

  describe('extract0', function () { ; });
});