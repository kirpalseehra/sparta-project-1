class ConnectFour {
  constructor(selector) {
    this.ROWS = 6;
    this.COLS = 7;
    this.selector = selector;
    this.player = 'redCounter';
    this.createGrid();
    this.gridEventListeners();
  }
  //creating the rows anc columns for the grid using javascript and jquery
  createGrid() {
    const board = $(this.selector);

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
      lastEmptyCell.addClass('next-${that.player}')
    });

    // when you hover elsewhere away from the cell it removes the colour from that cell
    board.on('mouseleave', '.col', function () {
      $('.col').removeClass('next-${that.player}');
    });

    board.on('click', '.col', function () {

      const col = $(this).data('col');
      const lastEmptyCell = findLastCell(col);
      lastEmptyCell.removeClass('empty');
      lastEmptyCell.addClass(that.player);
      that.player = (that.player === 'redCounter') ? 'blackCounter' : 'redCounter';

    });
  }

}