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
  //if no solution, return an empty array
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var newBoard = new Board({n: n});

  var setPiece = function(row, col, val) {
    let tempRow = newBoard.get(row);
    filledCols[col] = val;
    tempRow[col] = val;
    newBoard.set(row, tempRow);
  };

  var filledCols = {};
  for (var i = 0; i < n; i++) {
    filledCols[i] = 0;
  }

  var traverse = function(r) {
    for (let i = 0; i < n; i++) {
      if (!filledCols[i]) {
        setPiece(r, i, 1);
        if (n === r + 1) {
          solutionCount += 1;
          setPiece(r, i, 0);
          return;
        } else {
          traverse(r + 1);
        }
        setPiece(r, i, 0);
      }
    }
    return;
  };
  traverse(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  }
  var newBoard = new Board({n: n});
  var setPiece = function(row, col, val) {
    let tempRow = newBoard.get(row);
    filledCols[col] = val;
    tempRow[col] = val;
    newBoard.set(row, tempRow);
  };

  var filledCols = {};
  for (var i = 0; i < n; i++) {
    filledCols[i] = 0;
  }

  var solutionFound = false;
  var traverse = function(r) {
    for (let i = 0; i < n; i++) {
      if (!filledCols[i]) {
        setPiece(r, i, 1);
        if (!newBoard.hasMajorDiagonalConflictAt(i - r) && !newBoard.hasMinorDiagonalConflictAt(i + r)) {
          if (n === r + 1) {
            solutionFound = true;
            break;
          } else {
            traverse(r + 1);
            if (solutionFound === true) {
              break;
            }
          }
          setPiece(r, i, 0);
        } else {
          setPiece(r, i, 0);
        }
      }
    }
    return;
  };

  traverse(0);

  var solution = [];
  for (var i = 0; i < newBoard.attributes.n; i++) {
    solution.push(newBoard.get(i));
  }
  console.log('solution', solution);
  //define flag that returns boolean
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  //while loop while flag is false
  //check for all 4 conflicts
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0; //fixme
  var newBoard = new Board({n: n});

  var setPiece = function(row, col, val) {
    let tempRow = newBoard.get(row);
    filledCols[col] = val;
    tempRow[col] = val;
    newBoard.set(row, tempRow);
  };

  var filledCols = {};
  for (var i = 0; i < n; i++) {
    filledCols[i] = 0;
  }

  var traverse = function(r) {
    for (let i = 0; i < n; i++) {
      if (!filledCols[i]) {
        setPiece(r, i, 1);
        if (!newBoard.hasMajorDiagonalConflictAt(i - r) && !newBoard.hasMinorDiagonalConflictAt(i + r)) {
          if (n === r + 1) {
            solutionCount += 1;
            setPiece(r, i, 0);
            return;
          } else {
            traverse(r + 1);
          }
        }
        setPiece(r, i, 0);
      }
    }
    return;
  };
  traverse(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


