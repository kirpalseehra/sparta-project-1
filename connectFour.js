class ConnectFour {
  constructor(selector) {
    this.ROWS = 6;
    this.COLS = 7;
    this.selector = selector;
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
    // when you hover over a cell it identifies each cell
    board.on('mouseenter', '.col.empty', function () {
      console.log('here', this);
    });
  }

}