
/* !
 * lar
 * Linear Algebra Representation
 * Copyright (c) 2012 cvd-lab <cvd-lab@email.com> (https://github.com/cvd-lab/)
 * MIT License
 */

 !(function (exports) {

  /**
   * Library namespace.
   */

  var lar = exports.lar = {};

  /**
   * Library version.
   */

  lar.version = '0.0.0';

  /**
   * Dependancies
   */

  var numeric = require('numeric');

  /**
   * Variables
   */
  var max = Math.max;
  var min = Math.min;

  /**
   * Private utility function
   */

  var _private = lar._private = {};

  var _compareVertices = 
  _private.compareVertices = function (a, b) {
    return a - b;
  };

  var _compareCells =
  _private.compareCells = function (a, b) {
    var len = a.length;
    var diff = 0;
    var i = 0;

    while (i < len && diff === 0) {
      diff = a[i] - b[i];
      i += 1;
    }

    return diff;
  };

  /**
   * Create an m x n 0-filled matrix.
   *
   * @param {Number} m number of row.
   * @param {Number} n number of columns.
   * @return {Array} (m x n) 0-filled matrix.
   * @api private
   */
  
  var _zeros = 
  _private.zeros = function (m, n) {
    var matrix = new Array(m);
    var raw;
    var i_m = m;
    var i_n = n;

    while (--i_m >= 0) {
      raw = new Array(n);
      i_n = n;

      while (--i_n >= 0) {
        raw[i_n] = 0;
      }
      matrix[i_m] = raw;
    }

    return matrix;
  };

  /**
   * flat
   * Return a flat version of the given array of arrays.
   * 
   * @param {Array} arrays
   * @return {Array} array
   * @api private
   */

  var _flat =
  _private.flat = function (arrays) {
    var res = [];

    arrays.forEach(function (item) {
      res = res.concat(item);
    });

    return res;
  };

  /**
   * Transformation from *compressed matrix* to *binary matrix*.
   * Return a (m x n) *binary matrix*.
   *
   * @param {Array} cmat compressed matrix
   * @return {Array} binary matrix
   * @api private
   */

  var _binarize =
  _private.binarize = function (cmat) {
    var m = cmat.length;
    var n = max.apply(null, _flat(cmat)) + 1;
    var matrix = _zeros(m, n);

    cmat.forEach(function(row, k) {
      row.forEach(function(val) {
        matrix[k][val] = 1;
      });
    });

    return matrix;
  };

  /**
   * Transformation from *binary matrix* to *compressed matrix*.
   * Return a (m x n) *compressed matrix*.
   *
   * @param {Array} bmat binary matrix
   * @return {Array} compressed matrix
   * @api private
   */

  var _unbinarize =
  _private.unbinarize = function (bmat) {
    var matrix = [];

    bmat.forEach(function(row, i) {
      matrix.push([]);
      row.forEach(function(val, j) {
        if (val === 1) {
          matrix[i].push(j);
        }
      });
    });

    return matrix;
  };

  /**
   * lar basic operations namespace
   * 
   * @api public
   */

  var op = lar.op = {};


  /**
   * extract
   * return C_{k-1,0} cells
   *
   * @param {Array} cells array of arrays of C_{k,0} cells as vertices coordinate;
   * @return {Array} array of arrays of C_{k-1,0} cells as vertices coordinate;
   * @api public
   */

  var extract =
  op.extract = function (cells) { 
    var result = [];
    var newCell;
    var j = 0;

    cells.forEach(function (cell) {
      cell.forEach(function (vertex, i) {
        newCell = cell.slice(0);
        newCell.splice(i,1);
        newCell.sort(_compareVertices);
        result.push(newCell);
      });
    });

    result.sort(_compareCells);

    for (j = 1; j < result.length; j += 1) {
      if (_compareCells(result[j], result[j-1]) === 0) {
        result.splice(j--, 1);
      }
    }

    return result; 
  };

  /**
   * extrude
   * return C_{k+1,0} cells
   *
   * @param {Array} cells array of arrays of C_{k,0} cells as vertices coordinate;
   * @return {Array} array of arrays of C_{k+1,0} cells as vertices coordinate;
   * @api public
   */

  var extrude =
  op.extrude = function (cells) { return []; };

  /**
   * combine
   * return C_{i,j} = C_{i,0} x C_{j_0}^T
   *
   * @param {Array} matrix_i C_{i,0} matrix as array of arrays;
   * @param {Array} matrix_j C_{j,0} matrix as array of arrays;
   * @return {Array} C_{i,j} matrix as array of arrays;
   * @api public
   */

  var combine =
  op.combine = function (matrix_i, matrix_j) { 
    return numeric.dot(matrix_i, numeric.transpose(matrix_j));
  };

  /**
   * extract0
   * return C_{0,0} = C_{1,0}^T x C_{1_0}
   *
   * @param {Array} matrix C_{1,0} matrix as array of arrays;
   * @return {Array} C_{0,0} matrix as array of arrays;
   * @api public
   */

  var extract0 =
  op.extract0 = function (matrix) {
    return numeric.dot(numeric.transpose(matrix), matrix);
  };


  /**
   * Topology
   * 
   * @constructor
   
   * @param {Array} cells array of arrays of C_d0 cells as vertices index;
   * @api public
   */

  var Topology = 
  lar.Topology = function (cells) { 
    var table = [];
    var n = cells[0].length;
    var cells_i = cells;
    var binCells_i = _binarize(cells_i);
    var i = n - 1;

    for (i = 0; i < n; i += 1) {
      table[i] = [];
    }

    table[i][0] = binCells_i;
    table[0][i] = numeric.transpose(binCells_i);

    for (i = n - 2; i > 0; i -= 1 ) {
      binCells_i = 
      table[i][0] = binCells_i;
      table[0][i] = numeric.transpose(binCells_i);
    }

    this.cells = cells;
    this.table = table;
  };

  /**
   * get
   * return C_{i,j} matrix 
   * 
   * @param {number} i row table index
   * @param {number} j col table index
   * @return {Array} C_{i,j} matrix as array of arrays.
   * @api public
   */

  lar.Topology.prototype.get = function (i,j) {
    return this.table[i][j];
  };

   /**
   * boundary
   * return C_{i,j} boundary operator matrix 
   * 
   * @param {number} i row table index
   * @param {number} j col table index
   * @return {Array} C_{i,j} boundary operator as array of arrays.
   * @api public
   */

  lar.Topology.prototype.boundary = function (i) { }; 


  /**
   * Model
   * 
   * @constructor
   * @param {Array} vertices array of arrays of vertices coordinate;
   * @param {Array} cells array of arrays of C_d0 cells as vertices index;
   * @api public
   */

  var Model = 
  lar.Model = function (vertices, cells) { };

  /**
   * getRelationOp
   * return C_{i,j} matrix of topology table
   * related to the (optionally) given chain
   * 
   * @param {number} i row table index
   * @param {number} j col table index
   * @param {Array} [chain=[1,1,1,1,...]]  
   * @return {Array} C_{i,j} matrix as array of arrays.
   * @api public
   */

  lar.Model.prototype.getRelationOp = function (i, j, chain) { };

  /**
   * getBoundaryOp
   * return C_{i,j} boundary operator matrix
   * 
   * @param {number} i row table index
   * @param {number} j col table index
   * @return {Array} C_{i,j} boundary operator as array of arrays.
   * @api public
   */

  lar.Model.prototype.getBoundaryOp = function (i) { }; 

  /**
   * boundary
   * return boundary of the given level
   * related to the (optionally) given chain
   * 
   * @param {number} i row table index
   * @param {number} j col table index
   * @param {Array} [chain=[1,1,1,1,...]] 
   * @return {lar.Model} boundary of this model
   * @api public
   */

   lar.Model.prototype.boundary = function (i, chain) { }; 

 }(this));