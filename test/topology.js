var should = require('should');
var numeric = require('numeric');
var lar = require('../lib/lar.js').lar;

lar.sparse = false;

describe('Topology', function () {
  describe('constructor', function () {
    it('should instantiate a new 1D Topology', function () {
      var cells = [[0,1],[1,2],[2,3],[3,4]];
      var t = new lar.Topology(cells);

      var expected_c10 = [[1,1,0,0,0],[0,1,1,0,0],[0,0,1,1,0],[0,0,0,1,1]];
      var expected_c01 =  numeric.transpose(expected_c10);
      var expected_c00 = lar.ops.extract0(expected_c10);

      t.get(1,0).should.eql(expected_c10);
      t.get(0,1).should.eql(expected_c01);
      t.get(0,0).should.eql(expected_c00);
    });

    it('should instantiate a new 3D Topology', function () {
      var cells = [[0,1,3,4],[1,4,3,2]];
      var t = new lar.Topology(cells);

      var expected_c30 = [[1,1,0,1,1],[0,1,1,1,1]]; 
      var expected_c03 = numeric.transpose(expected_c30);
      var expected_c20 = [[1,1,0,1,0],[1,1,0,0,1],[1,0,0,1,1],[0,1,1,1,0],[0,1,1,0,1],[0,1,0,1,1],[0,0,1,1,1]];
      var expected_c02 = numeric.transpose(expected_c20);
      var expected_c10 = [[1,1,0,0,0],[1,0,0,1,0],[1,0,0,0,1],[0,1,1,0,0],[0,1,0,1,0],[0,1,0,0,1],[0,0,1,1,0],[0,0,1,0,1],[0,0,0,1,1]];
      var expected_c01 =  numeric.transpose(expected_c10);
      var expected_c00 = lar.ops.extract0(expected_c10);

      t.get(3,0).should.eql(expected_c30);
      t.get(0,3).should.eql(expected_c03);
      t.get(2,0).should.eql(expected_c20);
      t.get(0,2).should.eql(expected_c02);
      t.get(1,0).should.eql(expected_c10);
      t.get(0,1).should.eql(expected_c01);
      t.get(0,0).should.eql(expected_c00);
    });

    it('should instantiate a new Topology (shuffled indexes)', function () {
      var cells = [[4,1,3,0],[1,3,4,2]];
      var t = new lar.Topology(cells);

      var expected_c30 = [[1,1,0,1,1],[0,1,1,1,1]]; 
      var expected_c03 = numeric.transpose(expected_c30);
      var expected_c20 = [[1,1,0,1,0],[1,1,0,0,1],[1,0,0,1,1],[0,1,1,1,0],[0,1,1,0,1],[0,1,0,1,1],[0,0,1,1,1]];
      var expected_c02 = numeric.transpose(expected_c20);
      var expected_c10 = [[1,1,0,0,0],[1,0,0,1,0],[1,0,0,0,1],[0,1,1,0,0],[0,1,0,1,0],[0,1,0,0,1],[0,0,1,1,0],[0,0,1,0,1],[0,0,0,1,1]];
      var expected_c01 =  numeric.transpose(expected_c10);
      var expected_c00 = lar.ops.extract0(expected_c10);

      t.get(3,0).should.eql(expected_c30);
      t.get(0,3).should.eql(expected_c03);
      t.get(2,0).should.eql(expected_c20);
      t.get(0,2).should.eql(expected_c02);
      t.get(1,0).should.eql(expected_c10);
      t.get(0,1).should.eql(expected_c01);
      t.get(0,0).should.eql(expected_c00);
    });
  });
});