
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
   * Private utility function
   */

  var _compareVertices = function (a, b) {
    return a - b;
  };

  var _compareCells = function (a, b) {
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
  op.combine = function (matrix_i, matrix_j) { return []; };

  /**
   * extract0
   * return C_{0,0} = C_{1,0}^T x C_{1_0}
   *
   * @param {Array} matrix C_{1,0} matrix as array of arrays;
   * @return {Array} C_{0,0} matrix as array of arrays;
   * @api public
   */

  var extract0 =
  op.extract0 = function (matrix) { return []; };


  /**
   * Topology
   * 
   * @constructor
   
   * @param {Array} cells array of arrays of C_d0 cells as vertices index;
   * @api public
   */

  var Topology = 
  lar.Topology = function (vertices, cells) { };

  /**
   * get
   * return C_{i,j} matrix 
   * 
   * @param {number} i row table index
   * @param {number} j col table index
   * @return {Array} C_{i,j} matrix as array of arrays.
   * @api public
   */

  lar.Topology.prototype.get = function (i,j) { };

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