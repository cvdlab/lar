var should = require('should');
var lar = require('../lib/lar.js').lar;

describe('utils', function () {
  describe('_binarize', function () {
    it('should binarize matrix', function () { 
      var matrix = [[0,1,3,4],[1,2,3,4]];
      var expected =  [[1,1,0,1,1],[0,1,1,1,1]];
      var calculated = lar._private.binarize(matrix);

      calculated.should.eql(expected);
    });
  });

  describe('_unbinarize', function () {
    it('should unbinarize matrix', function () { 
      var matrix = [[1,0,0,0,0,0,1],[0,1,0,0,1,0,0],[0,0,1,1,0,0,0],[0,0,0,1,1,0,0],[0,0,0,0,1,1,0]];
      var expected =  [[0,6],[1,4],[2,3],[3,4],[4,5]];
      var calculated = lar._private.unbinarize(matrix);

      calculated.should.eql(expected);
    });
  });

  describe('_unbinarize(_binarize((matrix))', function () {
    it('should leave matrix unchanged', function () { 
      var matrix = [[0,1,3],[1,2,3]];
      var bin_unbin = lar._private.unbinarize(lar._private.binarize(matrix));
      
      matrix.should.eql(bin_unbin);
    });
  });
});