var should = require('should');
var lar = require('../lib/lar.js').lar;

describe('utils', function () {
  describe('_binarize', function () {
    it('should binarize matrix', function () { });
  });

  describe('_unbinarize', function () {
    it('should unbinarize matrix', function () { });
  });

  describe('_unbinarize(_binarize((matrix))', function () {
    it('should leave matrix unchanged', function () { 
      var matrix = [[0,1,3],[1,2,3]];
      var bin_unbin = lar._private.unbinarize(lar._private.binarize(matrix));
      
      matrix.should.eql(bin_unbin);
    });
  });
});