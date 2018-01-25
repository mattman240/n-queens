// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //get the current row index
      var row = this.get(rowIndex);
      //filter the array
      return row.filter(num => num > 0).length > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //get the size of the board
      var size = this.rows();
      //iterate through the array
      for(var i = 0; i < size.length; i++) {
        //pass each row into our row conflict func
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
     return false;

    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //make a counter to keep track of ones
      var counter = 0;
      //get the board
      var board = this.rows();
      //iterate over each row
      for (var i = 0; i < board.length; i++) {
        //check the row at colIndex for a one
        if(board[i][colIndex] === 1) {
          //incriment counter
          counter++;
        }
      }
      //if more than one row has same conflicts
      return counter > 1;
      //else return false
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //we need board size
      var size = this.rows()
      //loop through the board
      for(var i = 0; i < size.length; i++) {
        //call the hasColConflictAt on each col
        if (this.hasColConflictAt(i)) {
          //if any return true
          return true;
          //return true
        }
      }
      return false;
      //else return false
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //we need to get the size of our board
      var size = this.get('n');
      //we need a counter var
      var count = 0;
      //keep track of what row we are on with a second counter
      var row = 0;
      //get the index of the col
      var col = majorDiagonalColumnIndexAtFirstRow;
      //loop through both col and row in one loop for better complexity
      for(; row < size && col < size; row++, col++) {
        //check if the indes is greater than zero
        if(col >= 0) {
          //get the actual row
          var rowIndex = this.get(row)
          //increase the count (by either 0 or 1)
          count += rowIndex[col]
        }
      }
      //check if we had more than one rook in that row
      return count > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //get board size
      const size = this.get('n')
      //loop through the board
      for (let n = -size; n < size; n += 1) {
      //make a call to has major diagonal conflict
      if (this.hasMajorDiagonalConflictAt(n)) return true;
      //if any call to our function returns true
      //return true
    }
    return false;
      //else return false
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //we need to get the size of our board
      // debugger;
      var size = this.get('n');
      //we need a counter var
      var count = 0;
      //keep track of what row we are on with a second counter
      var row = size - 1;
      //get the index of the col
      var col = minorDiagonalColumnIndexAtFirstRow - size + 1;
      //loop through both col and row in one loop for better complexity
      for(; row > -size && col < size; row--, col++) {
        //check if the indes is greater than zero
        if(col >= 0) {
          //get the actual row
          var rowIndex = this.get(row)
          //increase the count (by either 0 or 1)
          if(rowIndex !== undefined) {
            count += rowIndex[col];
          }
        }
      }
      //check if we had more than one queen in that row
      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //get board size
      const size = this.get('n')
      //loop through the board
      for (let n = size + 1; n > -size; n -= 1) {
      //make a call to has major diagonal conflict
      if (this.hasMinorDiagonalConflictAt(n)) return true;
      //if any call to our function returns true
      //return true
    }
    return false;
      //else return false
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
