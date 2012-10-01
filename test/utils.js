var should = require('should');
var lar = require('../lib/lar.js').lar;

describe('utils', function () {
  describe('select', function () {
    it('should select any rows from a matrix', function () { 
      var matrix = [[0,1,3,4],[1,2,3,4],[3,5,6,7],[5,9,0,1]];
      var selector = [0,1,0,1];
      var expected =  [[1,2,3,4],[5,9,0,1]];
      var calculated = lar.utils.select(matrix,selector);

      calculated.should.eql(expected);
    });
  });

  describe('binarize', function () {
    it('should binarize matrix', function () { 
      var matrix = [[0,1,3,4],[1,2,3,4]];
      var expected =  [[1,1,0,1,1],[0,1,1,1,1]];
      var calculated = lar.utils.binarize(matrix);

      calculated.should.eql(expected);
    });
  });

  describe('unbinarize', function () {
    it('should unbinarize matrix', function () { 
      var matrix = [[1,0,0,0,0,0,1],[0,1,0,0,1,0,0],[0,0,1,1,0,0,0],[0,0,0,1,1,0,0],[0,0,0,0,1,1,0]];
      var expected =  [[0,6],[1,4],[2,3],[3,4],[4,5]];
      var calculated = lar.utils.unbinarize(matrix);

      calculated.should.eql(expected);
    });
  });

  describe('unbinarize(binarize((matrix))', function () {
    it('should leave matrix unchanged', function () { 
      var matrix = [[0,1,3],[1,2,3]];
      var bin_unbin = lar.utils.unbinarize(lar.utils.binarize(matrix));
      
      matrix.should.eql(bin_unbin);
    });
  });
});