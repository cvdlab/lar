
/* !
 * lar
 * Linear Algebra Representation
 * Copyright (c) 2012 Enrico Marino <enrico.marino@email.com> ({{author.site}})
 * Copyright (c) 2012 Federico Spini <federico.spini@gmail.com> ({{author.site}})
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
  op.extract = function (cells) { };

  /**
   * extrude
   * return C_{k+1,0} cells
   *
   * @param {Array} cells array of arrays of C_{k,0} cells as vertices coordinate;
   * @return {Array} array of arrays of C_{k+1,0} cells as vertices coordinate;
   * @api public
   */

  var extrude =
  op.extrude = function (cells) { };

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
  op.combine = function (matrix_i, matrix_j) {  };

  /**
   * extract0
   * return C_{0,0} = C_{1,0}^T x C_{1_0}
   *
   * @param {Array} matrix C_{1,0} matrix as array of arrays;
   * @return {Array} C_{0,0} matrix as array of arrays;
   * @api public
   */

  var extract0 =
  op.extract0 = function (matrix) {  };


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