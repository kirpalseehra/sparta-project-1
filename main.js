$(document).ready(function () {
  const connectFour = new ConnectFour('#connectFour');
  // reloads the html when the 'New Game' button is clicked
  $('#newGame').click(function () {
    location.reload();
  })
});
