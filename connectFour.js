class ConnectFour {
  constructor(selector) {
    this.ROWS = 6;
    this.COLS = 7;
    this.selector = selector;
    this.createGrid();
  }
  //creating the rows anc columns for the grid using javascript and jquery
  createGrid() {
    const board = $(this.selector);
    console.log(board);
    for (let x = 0; x < this.ROWS; x++) {
      const row = $('<div>').addClass('row');
      board.append(row);
      for (let y = 0; y < this.COLS; y++) {
        const col = $('<div>').addClass('col empty');
        row.append(col);
      }
    }

  }
}