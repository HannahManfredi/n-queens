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

window.findNRooksSolution = function(...args) {
  var newBoard = new Board({n: args[0]});
  var counter = 0;
  var setPiece = function(row, col, val) {
    let tempRow = newBoard.get(row);
    tempRow[col] = val;
    newBoard.set(row, tempRow);
  };
  if (args.length === 1) {
    setPiece( 0, 0, 1);
  } else {
    setPiece(args[1], args[2], 1);
  }
  counter ++;
  for (var i = 0; i <= newBoard.attributes.n - 1; i++) {
    for (var j = 0; j <= newBoard.attributes.n - 1; j++) {
      //console.log("row: ", i, ' || col: ', j);
      //outside if statement checking if piece exists
      if (!newBoard.get(i)[j]) {
        //add piece
        setPiece(i, j, 1);
        if (newBoard.hasRowConflictAt(i) || newBoard.hasColConflictAt(j)) {
          setPiece(i, j, 0);
        } else {
          counter++;
        }
      }
    }
  }
  console.log('--------');
  // console.log('n:', args[0]);

  // console.log(newBoard);
  var solution = [];
  if (counter === args[0]) {
    for (var i = 0; i < newBoard.attributes.n; i++) {
      solution.push(newBoard.get(i));
    }
  }
  console.log('solution: ', solution);
  console.log('Single solution for ' + args[0] + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var solutionBoards = [];

  var solutionIncluded = function(board) {
    board = JSON.stringify(board);
    if (!solutionBoards.includes(board)) {
      solutionBoards.push(board);
      solutionCount++;
    }
  };

  var hotdogFlip = function(k) {
    var flippedBoard = [];
    for (var i = k.length - 1; i >= 0; i--) {
      flippedBoard.push(k[i]);
    }
    console.log('hotdogflip', flippedBoard);
    return flippedBoard;
  };

  var hamburgerFlip = function(k) {
    var flippedBoard = [];
    //[[], [], [], []]
    for (var m = 0; m < k.length; m++ ) {
      flippedBoard.push([]);
    }

    for (var i = k.length - 1; i >= 0; i--) {
      for (var j = 0; j < k.length; j++ ) {
        flippedBoard[j].push(k[j][i]);
      }
    }

    console.log('hamburgerflip', flippedBoard);
    return flippedBoard;
  };

  for (var i = 0; i <= n - 1; i++) {
    for (var j = 0; j <= n - 1; j++) {
      var k = this.findNRooksSolution(n, i, j);
      if (k.length > 0) {
        solutionIncluded(k);
        solutionIncluded(hotdogFlip(k));
        solutionIncluded(hamburgerFlip(k));
      }
    }
  }

  console.log(solutionBoards);
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


