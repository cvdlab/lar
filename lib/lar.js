
/* !
 * lar
 * Linear Algebraic Representation
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

  lar.version = '0.1.2';

  /**
   * Dependancies
   */

  // var numeric = require('numeric');
  
  /**
   * Variables
   */

  var max = Math.max;
  var min = Math.min;
  var abs = Math.abs;

  /**
   * Utility function
   */

  var utils = lar.utils = {};

  var compareVertices = 
  utils.compareVertices = function (a, b) {
    return a - b;
  };

  var compareCells =
  utils.compareCells = function (a, b) {
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
   * fill
   * Create an m x n k-filled matrix.
   *
   * @param {Number} m number of row
   * @param {Number} n number of columns
   * @return {Array} (m x n) k-filled matrix
   * @api public
   */
  
  var fill = 
  utils.fill = function (m, n, k) {
    var matrix = new Array(m);
    var raw;
    var i_m = m;
    var i_n = n;

    while (--i_m >= 0) {
      raw = new Array(n);
      i_n = n;

      while (--i_n >= 0) {
        raw[i_n] = k;
      }
      matrix[i_m] = raw;
    }

    return matrix;
  };

  /**
   * zeros
   * Create an m x n 0-filled matrix.
   *
   * @param {Number} m number of row
   * @param {Number} n number of columns
   * @return {Array} (m x n) 0-filled matrix
   * @api public
   */
  
  var zeros = 
  utils.zeros = function (m, n) {
    return fill (m, n, 0);
  };

  /**
   * ones
   * Create an m x n 1-filled matrix.
   *
   * @param {Number} m number of row
   * @param {Number} n number of columns
   * @return {Array} (m x n) 1-filled matrix
   * @api public
   */
  
  var ones = 
  utils.ones = function (m, n) {
    return fill (m, n, 1);
  };

  /**
   * flat
   * Return a flat version of the given array of arrays.
   * 
   * @param {Array} arrays
   * @return {Array} array
   * @api public
   */

  var flat =
  utils.flat = function (arrays) {
    var res = [];

    arrays.forEach(function (item) {
      res = res.concat(item);
    });

    return res;
  };

  /**
   * select
   * Return selected row in the given matrix as array of arrays.
   * 
   * @param {Array} matrix
   * @param {Array} selector
   * @return {Array} array of selected rows
   * @api public
   */

  var select =
  utils.select = function (matrix, selector) {
    var res = [];

    selector.forEach(function (val, i) {
      if (val) {
        res.push(matrix[i]);
      }
    });

    return res;
  };

  /**
   * chainPut1
   * Return an array of 0s but indexes set to 1
   * 
   * @param {Number} n length of the array
   * @param {Array} indices to be setted to 1
   * @return {Array} array of selected rows
   * @api public
   */

  var chainPut1 = 
  utils.chainPut1 = function (n, indices) {
    var chain = lar.utils.flat(lar.utils.zeros(1,n));

    indices.forEach(function (i) {
      chain[i] = 1;
    });

    return chain;
  };

  /**
   * chainPut0
   * Return an array of 1s but indexes set to 0
   * 
   * @param {Number} n length of the array
   * @param {Array} indices to be setted to 0
   * @return {Array} array of selected rows
   * @api public
   */

  var chainPut0 = 
  utils.chainPut0 = function (n, indices) {
    var chain = lar.utils.flat(lar.utils.ones(1,n));

    indices.forEach(function (i) {
      chain[i] = 0;
    });

    return chain;
  }

  /**
   * binarize
   * Transformation from *compressed matrix* to *binary matrix*.
   * Return a (m x n) *binary matrix*.
   *
   * @param {Array} cmat compressed matrix
   * @return {Array} binary matrix
   * @api public
   */

  var binarize =
  utils.binarize = function (cmat) {
    var m = cmat.length;
    var n = max.apply(null, flat(cmat)) + 1;
    var matrix = zeros(m, n);

    cmat.forEach(function(row, k) {
      row.forEach(function(val) {
        matrix[k][val] = 1;
      });
    });

    return matrix;
  };

  /**
   * unbinarize
   * Transformation from *binary matrix* to *compressed matrix*.
   * Return a (m x n) *compressed matrix*.
   *
   * @param {Array} bmat binary matrix
   * @return {Array} compressed matrix
   * @api public
   */

  var unbinarize =
  utils.unbinarize = function (bmat) {
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

  var ops = lar.ops = {};


  /**
   * extract
   * Return C_{k-1,0} cells.
   *
   * @param {Array} cells array of arrays of C_{k,0} cells as vertices coordinate
   * @return {Array} array of arrays of C_{k-1,0} cells as vertices coordinate
   * @api public
   */

  var extract =
  ops.extract = function (cells) { 
    var result = [];
    var newCell;
    var j = 0;

    cells.forEach(function (cell) {
      cell.forEach(function (vertex, i) {
        newCell = cell.slice(0);
        newCell.splice(i,1);
        newCell.sort(compareVertices);
        result.push(newCell);
      });
    });

    result.sort(compareCells);

    for (j = 1; j < result.length; j += 1) {
      if (compareCells(result[j], result[j-1]) === 0) {
        result.splice(j--, 1);
      }
    }

    return result; 
  };

  /**
   * extrude
   * Return C_{k+1,0} cells.
   *
   * @param {Array} cells array of arrays of C_{k,0} cells as vertices coordinate
   * @params {Array} [hlist=[1]] list os layer quote (signs matter)
   * @return {Array} array of arrays of C_{k+1,0} cells as vertices coordinate
   * @api public
   */

  var extrude =
  ops.extrude = function (cells, hlist) {
    var triDown;
    var triUp;
    var prism;
    var result = [];
    var hlist = hlist || [1];
    var cellLen = cells[0].length;
    var newCellLen = cellLen + 1;
    var nextIndex = max.apply(null, flat(cells)) + 1;
    var i;

    hlist.forEach(function (h, layer) {
      if (h > 0) {
        cells.forEach(function (cell) {
          triDown = cell.map(function (coord) {
            return coord + nextIndex * layer;
          });
          triUp = cell.map(function (coord) {
            return coord + nextIndex * (layer + 1);
          });
          prism = triDown.concat(triUp);

          for (i = 0; i < cellLen; i += 1) {
            result.push(prism.slice(i, i + newCellLen));
          }
        });
      }
    });

    return result;
  };

  /**
   * combine
   * Return C_{i,j} = C_{i,0} x C_{j_0}^T.
   *
   * @param {Array} matrix_i C_{i,0} matrix as array of arrays
   * @param {Array} matrix_j C_{j,0} matrix as array of arrays
   * @return {Array} C_{i,j} matrix as array of arrays
   * @api public
   */

  var combine =
  ops.combine = function (matrix_i, matrix_j) { 
    return numeric.dot(matrix_i, matrix_j);
  };

  /**
   * extract0
   * Return C_{0,0} = C_{1,0}^T x C_{1_0}.
   *
   * @param {Array} matrix C_{1,0} matrix as array of arrays
   * @return {Array} C_{0,0} matrix as array of arrays
   * @api public
   */

  var extract0 =
  ops.extract0 = function (matrix) {
    return numeric.dot(numeric.transpose(matrix), matrix);
  };

  /**
   * boundarize
   * Makes C_{i,i+1} matrix boundary operator.
   *
   * @param {Array} matrix C_{i,i+i} matrix as array of arrays
   * @return {Array} C_{i,i+i} boundary operator matrix as array of arrays
   * @api public
   */

  var boundarize =
  ops.boundarize = function (matrix) {
    var operator = [];
    var maxIndexes;
    var maxVal;
    var operatorRow;

    matrix.forEach(function (row) {
      operatorRow = [];
      maxIndexes = [];
      maxVal = 0;

      row.forEach(function (val, j) {
        operatorRow.push(0);
        
        if (val > maxVal) {
          maxIndexes = [j];
          maxVal = val;
        } else if (val === maxVal) {
          maxIndexes.push(j);
          maxVal = val;
        }
      });

      maxIndexes.forEach(function (i) {
        operatorRow[i] = 1;
      });

      operator.push(operatorRow);
    });

    return operator;
  };

  /**
   * Topology
   * @constructor
   *
   * @param {Array} cells array of arrays of C_d0 cells as vertices index
   * @api public
   */

  var Topology = 
  lar.Topology = function (cells) {
    var cells_i;
    var binCells_i;
    var table = [];
    var sortedCells = [];
    var n = cells[0].length;
    var i, j;

    //sort input
    cells.forEach(function (cell) {
      sortedCells.push(cell.sort(compareVertices));
    });
    sortedCells.sort(compareCells);
    
    cells_i = sortedCells;
    binCells_i = binarize(cells_i);

    for (i = 0; i < n; i += 1) {
      table[i] = [];
      for (j = 0; j < n; j += 1) {
        table[i][j] = [];
      }
    }

    // handle input
    table[n-1][0] = binCells_i;
    table[0][n-1] = numeric.transpose(binCells_i);

    // loop to generate first row and first col
    for (i = n - 2; i > 0; i -= 1 ) {
      binCells_i = binarize(extract(unbinarize(table[i+1][0])));
      table[i][0] = binCells_i;
      table[0][i] = numeric.transpose(binCells_i);
    }

    // loop to generate all the operators
    for (i = 1; i < n; i += 1) {
      for (j = 1; j < n; j += 1) {
        table[i][j] = combine(table[i][0], table[0][j]);
      }
    }

    table[0][0] = extract0(table[1][0]);

    this.cells = sortedCells;
    this.table = table;
    this.boundaries = [];
  };

  /**
   * get
   * Return C_{i,j} matrix.
   * 
   * @param {number} i row table index
   * @param {number} j col table index
   * @return {Array} C_{i,j} matrix as array of arrays
   * @api public
   */

  lar.Topology.prototype.get = function (i,j) {
    return this.table[i][j];
  };

   /**
   * boundary
   * Return C_{i,i+1} boundary operator matrix.
   * 
   * @param {number} i row table index
   * @return {Array} C_{i,i+1} boundary operator as array of arrays
   * @api public
   */

  lar.Topology.prototype.boundary = function (i) {
    var boundaries = this.boundaries;
    var operator = boundaries[i];

    if (!operator) {
      operator = boundarize(this.get(i,i+1));
      boundaries[i] = operator;
    }

    return operator;
  };

   /**
   * coboundary
   * Return C_{i,i-1} boundary operator matrix.
   * 
   * @param {number} i row table index
   * @return {Array} C_{i,i-1} boundary operator as array of arrays
   * @api public
   */

  lar.Topology.prototype.coboundary = function (i) {
    return numeric.transpose(this.boundary(i));
  };

   /**
   * extrude
   * Return extruded cells.
   * 
   * @param {Array} hlist list of quotes (only sings matter)
   * @return {Array} extruded cells as array of arrays
   * @api public
   */

  lar.Topology.prototype.extrude = function (hlist) {
    return extrude(this.cells, hlist);
  };

  /**
   * Model
   * 
   * @constructor
   * @param {Array} vertices array of arrays of vertices coordinate
   * @param {Array} cells array of arrays of C_d0 cells as vertices index
   * @api public
   */

  var Model = 
  lar.Model = function (vertices, cells) { 
    this.vertices = vertices;
    if (cells !== undefined && cells !== null && cells.length > 0) {
      this.empty = false;
      this.cells = cells;
      this.topology = new Topology(cells);
      this.sortedCells = this.topology.cells;
    } else {
      this.empty = true;
    }
  };

  /**
   * isEmpty
   * Test if the model is empty
   * (e.g. is obtained as the boundary of a boundary).
   * 
   * @api public
   */

  lar.Model.prototype.isEmpty = function () {
    return this.empty;
  };

  /**
   * getChain
   * Return list of ordered d-cells.
   * 
   * @param {number} d cells dimension
   * @param {Array} selector d-cell binary chain selector
   * @param {Boolean} [included=true] selector indexes to be included or excluded
   * @return {Array} d-cells as array of arrays of vertex indexes
   * @api public
   */

  lar.Model.prototype.getChain = function (d, selector, included) {
    var included = included !== undefined ? included : true;
    var cells;
    var c_d0 = this.topology.get(d,0);
    var length = c_d0.length;
    var chain = included ? chainPut1(length, selector) : chainPut0(length, selector);

    cells = unbinarize(select(c_d0, chain));

    return cells;
  };

  /**
   * getCells
   * Return list of ordered d-cells.
   * 
   * @param {number} d cells dimension
   * @return {Array} d-cells as array of arrays of vertex indexes
   * @api public
   */

  lar.Model.prototype.getCells = function (d) {
    return this.getChain(d, [], false);
  };

  /**
   * submodel
   * Return a chain as a Model.
   * 
   * @param {number} d cells dimension
   * @param {Array} selector d-cell binary chain selector
   * @param {Boolean} [included=true] selector indexes to be included or excluded
   * @return {lar.Model} model
   * @api public
   */

  lar.Model.prototype.submodel = function (d, selector, included) {
    var included = included !== undefined ? included : true;
    var length = this.topology.get(d,0).length;
    var chain = this.getChain(d, selector, included);

    return new Model(this.vertices, chain);
  };

  /**
   * skeleton
   * Return d-skeleton of the model.
   * 
   * @param {number} d dimension of the skeleton
   * @return {lar.Model} skeleton
   * @api public
   */

  lar.Model.prototype.skeleton = function (d) {
    var length = this.topology.get(d,0).length;

    return this.submodel(d, [], false);
  };

  /**
   * map
   * Return C_{i,j} applied to j-chain.
   * 
   * @param {number} i row table index
   * @param {number} j col table index
   * @param {Array} j-chain
   * @param {Boolean} [included=true] j-chain indexes to be included or excluded
   * @return {Array} C_{i,j} applied to j-chain
   * @api public
   */

  lar.Model.prototype.map = function (i, j, chain, included) {
    var included = included !== undefined ? included : true;
    var c_ij = this.topology.get(i,j);
    var length = c_ij.length;
    var explicitChain = included ? chainPut1(length, chain) : chainPut0(length, chain);

    return numeric.dot(c_ij, explicitChain);
  };

  /**
   * boundary
   * Return p-boundary of the given p-chain.
   * 
   * @param {Number} p
   * @param {Array} [p-chain=all cells]
   * @param {Boolean} [included=true] p-chain indexes to be included or excluded
   * @return {lar.Model} boundary of given p-chain
   * @api public
   */

  lar.Model.prototype.boundary = function (p, chain, included) {
    var included = included !== undefined ? included : true;
    var topology = this.topology;
    var operator = topology.boundary(p-1);
    var c_i0 = topology.get(p-1,0);
    var length = topology.get(p,0).length;
    var boundary;
    var cells;
    var explicitChain;
    
    if (arguments.length === 1) {
      explicitChain = flat(ones(1,length));
    } else {
      explicitChain = included ? chainPut1(length, chain) : chainPut0(length, chain);
    }

    boundary = numeric.dot(operator, explicitChain);

    boundary.forEach(function (val, j) {
      boundary[j] = val % 2;
    });

    cells = unbinarize(select(c_i0, boundary));
    return new Model(this.vertices, cells);
  };

  /**
   * coboundary
   * Return p-coboundary of the given p-chain.
   * 
   * @param {Number} p
   * @param {Array} [p-chain=all cells]
   * @param {Boolean} [included=true] indexes to be included or excluded
   * @return {lar.Model} coboundary of given p-chain
   * @api public
   */

  lar.Model.prototype.coboundary = function (p, chain, included) {
    var included = included !== undefined ? included : true;
    var topology = this.topology;
    var operator = topology.coboundary(p);
    var c_i0 = topology.get(p+1,0);
    var length = topology.get(p,0).length;
    var explicitChain;
    var coboundary;
    var cells;

    if (arguments.length === 1) {
      explicitChain = flat(ones(1,length));
    } else {
      explicitChain = included ? chainPut1(length, chain) : chainPut0(length, chain);
    }

    coboundary = numeric.dot(operator, explicitChain);

    coboundary.forEach(function (val, j) {
      coboundary[j] = val % 2;
    });

    cells = unbinarize(select(c_i0, coboundary));
    return new Model(this.vertices, cells);
  };

  /**
   * extrude
   * Extrude model by a list of quotes.
   * Negative list values stand for empty step.
   * No consecutive negetive values allowed.
   * First value in the list must be positive.
   *
   * @param {Array} hlist
   * return {lar.Model} model
   */

  lar.Model.prototype.extrude = function (hlist) {
    var vertices = this.vertices;
    var newVertices = [];
    var newCells;
    var newTranslatedVertices = [];
    var newVertex;
    var newTranslatedVertex;
    var quote = 0;
    
    vertices.forEach(function (v) {
      newVertex = v.slice(0);
      newVertex.push(0);
      newVertices.push(newVertex);
    });

    hlist.forEach(function (h) {
      quote += abs(h);
      vertices.forEach(function (v) {
        newTranslatedVertex = v.slice(0);
        newTranslatedVertex.push(quote);
        newVertices.push(newTranslatedVertex);
      });
    });

    newCells = this.topology.extrude(hlist);
    return new Model(newVertices, newCells);
  };

  /**
   * orient
   * Orient model cells.
   * 
   * @api public
   */
  lar.Model.prototype.orient = function () { ; };

  /**
   * filter
   * Filter out unindexed vertices.
   * 
   * @api public
   */

  lar.Model.prototype.filter = function () { ; };

  /**
   * clone
   * Return a deep cloned copy of this model.
   * 
   * @return {lar.Model} deep clone of this model
   * @api public
   */

  lar.Model.prototype.clone = function () {
    var vertices = this.vertices.map(function (v) { return v.slice(0); });

    return new Model(vertices, this.cells);
  };
 }(this));