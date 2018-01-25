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
    return board.rows();
  }
  var solution = searchRows(boardArr);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = 0; //fixme
  // let board = new Board({'n': n});
  // let boardArr = board.rows();
  // let searchRows = (boardArr, colIndex, rowIndex) => {
  //   boardArr.forEach( (row, rowIndex) => {
  //     let currentRow = row;
  //     row.forEach( (space, colIndex) => {
  //       //check if a 1 at current index would pass all rook tests.
  //         // if it would, add 1 to current position in row and recurse;
  //       if (space !== 1){
  //         board.togglePiece(rowIndex, colIndex);
  //         if (!board.hasAnyRooksConflicts()){
  //           solutionCount += 1;
  //           console.log(JSON.stringify(board.rows()));
  //           return searchRows(board.rows(), colIndex);
  //         } else {
  //           board.togglePiece(rowIndex, colIndex);
  //         }
  //       }
  //     })
  //   })
  //   return board.rows();
  // }
  //
  // searchRows(boardArr)
  //
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
  var solutionCount = 0; //fixme
  //get board
  let board = new Board({'n': n});
  //get boardArray
  let boardArr = board.rows();
  //outer function
  let searchRows = (boardArr , i = 0, n = 0) => {
    let newBoard = [];
    for (; i < boardArr.length; i++) {
      for (; n < boardArr[i].length; n++) {
        var currentRow = [];
        if (boardArr[i][n] !== 1){
          board.togglePiece(i, n);
          if (!board.hasAnyRooksConflicts()) {
            solutionCount += 1;
            searchRows(board.rows(), i, n);
          } else {
            board.togglePiece(i, n)
          }
        }
      }
      return newBoard.concat(searchRows())
    }
    return newBoard;
  }
  searchRows(boardArr)


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
