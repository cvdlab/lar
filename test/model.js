var should = require('should');
var numeric = require('numeric');
var lar = require('../lib/lar.js').lar;

describe('Model', function () {
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
      var d_chain = m.getChain(1,[0,1,1,0,1,0,0]);
      var expectedChain = [[0,4],[1,2],[2,3]];
      expectedChain.should.eql(d_chain);
    });
  });

  describe('boundary', function () {
    it('should extract boundary of a 2d Model', function () {
      var cells = [[0,1,2],[1,2,3]];
      var vertices = [[0,0],[0,1],[0.5,1],[1.5,1]];
      var m = new lar.Model(vertices, cells);
      var boundary = m.boundary(1, [0,1]);
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
      var b = m.boundary(1, [0,0,0,1,0,0,0]);
      var boundaryCells = b.getCells(1);
      var expectedboudnaryCells = [[1,2],[1,3],[2,3]];

      boundaryCells.should.eql(expectedboudnaryCells);
    });

    it('should give an empty border when query boundary(boundary(model))', function () {
      var cells = [[0,1,2,3],[1,2,3,4]];
      var vertices = [[2.5,2.5,5],[0,0,0],[5,0,0],[5,5,0],[2.5,2.5,-5]];
      var m = new lar.Model(vertices, cells);
      var b1 = m.boundary(2);
      var b2 = b1.boundary(1);

      b2.isEmpty().should.be.true;
    });
  });
});