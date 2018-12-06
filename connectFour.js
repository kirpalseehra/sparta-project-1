class ConnectFour {
  constructor(selector) {
    this.ROWS = 6;
    this.COLS = 7;
    this.selector = selector;
    //start off as red counters
    this.currentPlayer = 'redCounter';
    this.createGrid();
    this.gridEventListeners();
  }

  //creating the rows anc columns for the grid using javascript and jquery
  createGrid() {
    const board = $(this.selector);
    board.empty();

    console.log(board);
    for (let x = 0; x < this.ROWS; x++) {
      const row = $('<div>').addClass('row');
      board.append(row);
      for (let y = 0; y < this.COLS; y++) {
        // gives each index of the rows and columns using the attr
        const col = $('<div>').addClass('col empty').attr('data-col', y).attr('data-row', x);
        row.append(col);
      }
    }

  }

  //all the event listeners when a user clicks or hovers over each index in the grid
  gridEventListeners() {
    const board = $(this.selector);
    const that = this;
    function findLastCell(col) {
      //get all the columns that have the same attribute data-col and make it equal to the index column col
      const cells = $(`.col[data-col='${col}']`);
      // reverse the array so you drop to the bottom first 
      for (let i = cells.length - 1; i >= 0; i--) {
        const currentCell = $(cells[i]);
        if (currentCell.hasClass('empty')) {
          return currentCell;
        }
      }
      return null;

    }
    // when you hover over a cell it identifies each cell 
    board.on('mouseenter', '.col.empty', function () {
      const col = $(this).data('col');
      const lastEmptyCell = findLastCell(col);
      lastEmptyCell.addClass(`hover-${that.currentPlayer}`);
    });

    // when you hover elsewhere away from the cell it removes the colour from that cell
    board.on('mouseleave', '.col', function () {
      $('.col').removeClass(`hover-${that.currentPlayer}`);
    });

    board.on('click', '.col', function () {

      const col = $(this).data('col');
      const lastEmptyCell = findLastCell(col);
      lastEmptyCell.removeClass('empty');
      lastEmptyCell.addClass(that.currentPlayer);
      lastEmptyCell.data('player', that.currentPlayer);

      // calls the checkIfWin function and displays a message to the winner if the condition is satisfied
      const winner = that.checkIfWin(lastEmptyCell.data('row'), lastEmptyCell.data('col'))
      if (winner) {
        alert('Congratulations! You are the winner!');
      }

      // if currentPlayer is equal to red then change it to yellow else change it to red
      that.currentPlayer = (that.currentPlayer === 'redCounter') ? 'yellowCounter' : 'redCounter';

    });
  }

  checkIfWin(row, col) {

    const that = this;

    function getCell(i, j) {
      return $(`.col[data-row='${i}'][data-col='${j}']`);
    }

    function checkDirection(direction) {
      let total = 0;
      let i = row + direction.i;
      let j = col + direction.j;
      let next = getCell(i, j);
      while (i >= 0 && i < that.ROWS && j >= 0 && j < that.COLS && next.data('player') === that.currentPlayer) {
        total++;
        i += direction.i;
        j += direction.j;
        next = getCell(i, j);

      }
      return total;
    }

    // function to check if 
    function checkWin(a, b) {
      const total = 1 + checkDirection(a) + checkDirection(b);
      if (total >= 4 && total < 5) {
        return that.currentPlayer;

      } else {
        return null;
      }
    }

    function GameWinVH() {
      // checking the co-ordinates vertically and horizontally to see if the player has won 
      return checkWin({ i: -1, j: 0 }, { i: 1, j: 0 }) || checkWin({ i: 0, j: -1 }, { i: 0, j: 1 });
    }

    return GameWinVH()
  }

}

// win conditions
// change the text on player's turn
// styling