/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  let board = new Board({'n': n});
  let boardArr = board.rows();
  let searchRows = boardArr => {
    boardArr.forEach( (row, rowIndex) => {
      let currentRow = row;
      row.forEach( (space, colIndex) => {
        //check if a 1 at current index would pass all rook tests.
          // if it would, add 1 to current position in row and recurse;
          if (space !== 1){
            board.togglePiece(rowIndex, colIndex)
            if (!board.hasAnyRooksConflicts()){
              return searchRows(boardArr);
            } else {
              board.togglePiece(rowIndex, colIndex)
            }
        }
      })
    })
  }
  var solution = searchRows(boardArr);

  //place piece
  //check col con
  //check row con
  //if both return false, place rook

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
