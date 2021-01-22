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

//keep in mind...how to allow for future expansion?

window.findNRooksSolution = function(n) { //add an argument for which version of loop we want to use
  var newBoard = new Board({n: n});
  var counter = 0;

  var setPiece = function(row, col, val) {
    let tempRow = newBoard.get(row);
    tempRow[col] = val;
    newBoard.set(row, tempRow);
  };
  setPiece( 0, 0, 1);
  counter++;

  for (var i = 0; i <= newBoard.attributes.n - 1; i++) {
    for (var j = 0; j <= newBoard.attributes.n - 1; j++) {
      if (!newBoard.get(i)[j]) {
        setPiece(i, j, 1);
        if (newBoard.hasRowConflictAt(i) || newBoard.hasColConflictAt(j)) {
          setPiece(i, j, 0);
        } else {
          counter++;
        }
      }
    }
  }

  var solution = [];
  if (counter === n) {
    for (var i = 0; i < newBoard.attributes.n; i++) {
      solution.push(newBoard.get(i));
    }
  }
  console.log('solution: ', solution);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  console.log('-----', n, '---------');
  var solutionCount = 0; //fixme
  var solutionBoards = [];
  var newBoard = new Board({n: n});
  var setPiece = function(row, col, val) {
    console.log('r: ', row, 'c: ', col, 'v: ', val);
    let tempRow = newBoard.get(row);
    tempRow[col] = val;
    console.log('tempRow: ', tempRow);
    newBoard.set(row, tempRow);
    console.log('newBoard', newBoard);
  };

  var solutionIncluded = function() {
    //console.log(solutionIncuded);
    var board = [];
    for (var i = 0; i < newBoard.attributes.n; i++) {
      board.push(newBoard.get(i));
    }
    board = JSON.stringify(board);
    if (!solutionBoards.includes(board)) {
      solutionBoards.push(board);
      return false;
    } else {
      return true;
    }
  };

  // var solutionBoards = [];
  //return an inner function traverse
  var traverse = function(r) {
    console.log('r', r);
    for (let i = 0; i < n; i++) { //loop over row
      console.log('1');
      setPiece(r, i, 1); //place a piece
      if (!newBoard.hasRowConflictAt(r) || !newBoard.hasColConflictAt(i)) { //if no conflicts
        if (n === r + 1) { //are we currently on last row
          if (!solutionIncluded()) {
            solutionCount += 1;
            console.log('solutionCount', solutionCount);
            console.log('2');
            setPiece(r, i, 0);
            return;
          }
        } else {
          traverse(r + 1);
        }
      }
      console.log('3');
      setPiece(r, i, 0); //remove a piece
    }
    return;
  };
  traverse(0);

  //check for row and col conflicts
  // if row = n - 1 return 1
  //call traverse with row + 1
  // remove piece

  //invoke with row 1
  //[1, 0, 0] row = 0
  //[0, 1, 0] row = 1
  //[0, 0, 1]
  //console.log('solutionBoards', solutionBoards);
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


