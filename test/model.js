var should = require('should');
var numeric = require('numeric');
var lar = require('../lib/lar.js').lar;

describe('Model', function () {
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

    it('should extract boundary of a 3d Model', function () {
      var cells = [[0,1,2,3],[1,2,3,4]];
      var vertices = [[0,0,5],[0,0,0],[0,2,0],[3,1,0]];
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
  });
});