# Documentation

Linear Algebraic Representation Documentation

## Model

### constructor

```
@param {Array} vertices array of arrays of vertices coordinate
@param {Array} cells array of arrays of C_d0 cells as vertices index
```

### isEmpty

Test if the model is empty (e.g. is obtained as the boundary of a boundary).


### getChain

Return list of ordered d-cells.

```
@param {number} d cells dimension
@param {Array} selector d-cell binary chain selector
@param {Boolean} [included=true] selector indexes to be included or excluded
@return {Array} d-cells as array of arrays of vertex indexes
```

### getCells

Return list of ordered d-cells.

```
@param {number} d cells dimension
@return {Array} d-cells as array of arrays of vertex indexes
```

### submodel

Return a chain as a Model.

```
@param {number} d cells dimension
@param {Array} selector d-cell binary chain selector
@param {Boolean} [included=true] selector indexes to be included or excluded
@return {lar.Model} model
```

### skeleton

Return d-skeleton of the model.

```
@param {number} d dimension of the skeleton
@return {lar.Model} skeleton
```

### map

Return C_{i,j} applied to j-chain.

```
@param {number} i row table index
@param {number} j col table index
@param {Array} j-chain
@param {Boolean} [included=true] j-chain indexes to be included or excluded
@return {Array} C_{i,j} applied to j-chain
```

### boundary

Return i-boundary of the given (i+1)-chain.

```
@param {Number} i 
@param {Array} [p-chain=all cells]
@return {lar.Model} boundary of given p-chain
```

### coboundary

Return p-coboundary of the given p-chain.

```
@param {Number} p
@param {Array} [p-chain=all cells]
@param {Boolean} [included=true] indexes to be included or excluded
@return {lar.Model} coboundary of given p-chain
```

### extrude

Extrude model by a list of quotes.
Negative list values stand for empty step.
No consecutive negetive values allowed.
First quote in the list must be positive.

```
@param {Number} heigth
@return {lar.Model} model
```

### orient

Orient model cells.

```
not implemented yet
```

### filter

Filter out unindexed vertices.

```
not implemented yet
```

### clone

Return a deep cloned copy of this model.

```
@return {lar.Model} deep clone of this model
```