var should = require('should');
var lar = require('../lib/lar.js').lar;

lar.sparse = false;

describe('ops', function () {
  describe('extract', function () {
    it('should extract vertices from one edge', function () {
      var cells = [[0,1]];
      var expected =  [[0],[1]];
      var extracted = lar.ops.extract(cells);
      
      extracted.should.eql(expected);
    });

    it('should extract edges from one triangle', function () {
      var cells = [[0,1,2]];
      var expected =  [[0,1],[0,2],[1,2]];
      var extracted = lar.ops.extract(cells);
      
      extracted.should.eql(expected);
    });

    it('should extract edges from two triangles', function () {
      var cells = [[0,1,3],[1,2,3]];
      var expected =  [[0,1],[0,3],[1,2],[1,3],[2,3]];
      var extracted = lar.ops.extract(cells);
      
      extracted.should.eql(expected);
    });

    it('should extract triangles from one tetrahedron', function () {
      var cells = [[0,1,2,3]];
      var expected =  [[0,1,2],[0,1,3],[0,2,3],[1,2,3]];
      var extractedCells = lar.ops.extract(cells);
      
      extractedCells.should.eql(expected);
    });
  });

  describe('extrude', function () {
    it('should extrude one triangle', function () {
      var cells = [[0,1,2]];
      var expected =  [[0,1,2,3],[1,2,3,4],[2,3,4,5]];
      var extrudedCells = lar.ops.extrude(cells);
      
      extrudedCells.should.eql(expected);
    });

    it('should extrude three triangles', function () {
      var cells = [[0,1,2],[1,2,3],[1,3,4]];
      var expected =  [[0,1,2,5],[1,2,5,6],[2,5,6,7],[1,2,3,6],[2,3,6,7],[3,6,7,8],[1,3,4,6],[3,4,6,8],[4,6,8,9]];
      var extrudedCells = lar.ops.extrude(cells);
      
      extrudedCells.should.eql(expected);
    });
  });

  describe('combine', function () { ; });

  describe('extract0', function () { ; });

  describe('boundarize', function () {
    it('should boundarize matrix', function () {
      var matrix = [[2,0,1,2,4],[0,3,1,0,0],[4,4,0,0,3],[6,0,1,3,6],[0,0,0,2,0]];
      var expected =  [[0,0,0,0,1],[0,1,0,0,0],[1,1,0,0,0],[1,0,0,0,1],[0,0,0,1,0]];
      var calculated = lar.ops.boundarize(matrix);
      
      calculated.should.eql(expected);
    });
  });
});