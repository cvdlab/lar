var should = require('should');
var numeric = require('numeric');
var lar = require('../lib/lar.js').lar;

lar.sparse = false;

describe('Model', function () {
  describe('constructor', function () {
    it('should instantiate a new 1D Model', function () {
      var cells = [[0,1],[1,2],[2,3],[3,4]];
      var vertices = [[0],[1],[2],[3],[4]];
      var m = new lar.Model(vertices, cells);

      var t = m.topology;
      var expected_c10 = [[1,1,0,0,0],[0,1,1,0,0],[0,0,1,1,0],[0,0,0,1,1]];
      var expected_c01 =  numeric.transpose(expected_c10);
      var expected_c00 = lar.ops.extract0(expected_c10);

      m.vertices.should.eql(vertices);
      m.cells.should.eql(cells);
      m.empty.should.be.false;
      t.get(1,0).should.eql(expected_c10);
      t.get(0,1).should.eql(expected_c01);
      t.get(0,0).should.eql(expected_c00);
    });
  });

   describe('getCells', function () {
    it('should extract a 1-chain from a 2d Model', function () {
      var cells = [[0,4,2],[4,2,3],[2,3,1]];
      var vertices = [[0,0],[2,0],[3,1],[4,0],[1,1]];
      var m = new lar.Model(vertices, cells);
      var d_cells = m.getCells(1);
      var expectedCells = [[0,2],[0,4],[1,2],[1,3],[2,3],[2,4],[3,4]];
      expectedCells.should.eql(d_cells);
    });
  });

   describe('getChain', function () {
    it('should extract a 1-chain from a 2d Model', function () {
      var cells = [[0,4,2],[4,2,3],[2,3,1]];
      var vertices = [[0,0],[2,0],[3,1],[4,0],[1,1]];
      var m = new lar.Model(vertices, cells);
      var d_chain = m.getChain(1, [0,3,5,6], false);
      var expectedChain = [[0,4],[1,2],[2,3]];
      expectedChain.should.eql(d_chain);
    });
  });

  describe('boundary', function () {
    it('should extract boundary of a 2d Model', function () {
      var cells = [[0,1,2],[1,2,3]];
      var vertices = [[0,0],[0,1],[0.5,1],[1.5,1]];
      var m = new lar.Model(vertices, cells);
      var boundary = m.boundary(2, [1]);
      var t = boundary.topology;
      
      var expected_c10 = [[0,1,1,0],[0,1,0,1],[0,0,1,1]];
      var expected_c01 = numeric.transpose(expected_c10);
      var expected_c00 = lar.ops.extract0(expected_c10);

      t.get(1,0).should.eql(expected_c10);
      t.get(0,1).should.eql(expected_c01);
      t.get(0,0).should.eql(expected_c00);
      vertices.should.eql(vertices);
    });

    it('should extract 1-boundary of a chain from 3d Model', function () {
      var cells = [[0,1,2,3],[1,2,3,4]];
      var vertices = [[2.5,2.5,5],[0,0,0],[5,0,0],[5,5,0],[2.5,2.5,-5]];
      var m = new lar.Model(vertices, cells);
      var b = m.boundary(2, [3]);
      var boundaryCells = b.getCells(1);
      var expectedboudnaryCells = [[1,2],[1,3],[2,3]];

      boundaryCells.should.eql(expectedboudnaryCells);
    });

    it('should give an empty border when query boundary(boundary(model))', function () {
      var cells = [[0,1,2,3],[1,2,3,4]];
      var vertices = [[2.5,2.5,5],[0,0,0],[5,0,0],[5,5,0],[2.5,2.5,-5]];
      var m = new lar.Model(vertices, cells);
      var b1 = m.boundary(3);
      var b2 = b1.boundary(2);

      b2.isEmpty().should.be.true;
    });
  });
  
  describe('extrude', function () {
    it('should extrude a 1d Model', function () {
      var m1Vertices = [[0],[1],[2],[3]];
      var m1Cells = [[0,1],[1,2],[2,3]];
      var m1 = new lar.Model(m1Vertices, m1Cells);
      var m2 = m1.extrude([2]);
      var m2Vertices = m2.vertices;
      var m2Cells = m2.sortedCells;

      var expectedVertices = [[0,0],[1,0],[2,0],[3,0],[0,2],[1,2],[2,2],[3,2]];
      var expectedCells = [[0,1,4],[1,2,5],[1,4,5],[2,3,6],[2,5,6],[3,6,7]];

      m2Vertices.should.eql(expectedVertices);
      m2Cells.should.eql(expectedCells);
    });

    it('should extrude a triangle', function () {
      var m1Vertices = [[0,0],[0,1],[1,0]];
      var m1Cells = [[0,1,2]];
      var m1 = new lar.Model(m1Vertices, m1Cells);
      var m2 = m1.extrude([2,2]);
      var m2Vertices = m2.vertices;
      var m2Cells = m2.sortedCells;

      var expectedVertices = [[0,0,0],[0,1,0],[1,0,0],
                              [0,0,2],[0,1,2],[1,0,2],
                              [0,0,4],[0,1,4],[1,0,4]];
      var expectedCells = [[0,1,2,3],[1,2,3,4],[2,3,4,5],[3,4,5,6],[4,5,6,7],[5,6,7,8]];

      m2Vertices.should.eql(expectedVertices);
      m2Cells.should.eql(expectedCells);
    });

    it('should extrude a triangle (negative quotes)', function () {
      var m1Vertices = [[0,0],[0,1],[1,0]];
      var m1Cells = [[0,1,2]];
      var m1 = new lar.Model(m1Vertices, m1Cells);
      var m2 = m1.extrude([2,-2,2]);
      var m2Vertices = m2.vertices;
      var m2Cells = m2.sortedCells;

      var expectedVertices = [[0,0,0],[0,1,0],[1,0,0],
                              [0,0,2],[0,1,2],[1,0,2],
                              [0,0,4],[0,1,4],[1,0,4],
                              [0,0,6],[0,1,6],[1,0,6]];
      var expectedCells = [[0,1,2,3],[1,2,3,4],[2,3,4,5],
                           [6,7,8,9],[7,8,9,10],[8,9,10,11]];

      m2Vertices.should.eql(expectedVertices);
      m2Cells.should.eql(expectedCells);
    });
  });
});