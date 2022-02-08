const boardContainer = document.querySelector(".boardContainer");
const winnerText = document.querySelector("#winnerText");
const gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  return { board };
})();

const createPlayer = (name, marker) => {
  return { name, marker };
};

const game = ((gameBoard) => {
  const player1 = createPlayer("Player1", "X");
  const player2 = createPlayer("Player2", "O");

  let currentPlayer = player1;
  let isGameOver = false;

  const changePlayer = () => {
    currentPlayer === player1
      ? (currentPlayer = player2)
      : (currentPlayer = player1);
  };

  const checkRowsForWin = () => {
    for (let i = 0; i < gameBoard.board.length; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard.board[i].every((el) => el === "X")) {
          isGameOver = true;
          return player1;
        } else if (gameBoard.board[i].every((el) => el === "O")) {
          isGameOver = true;
          return player2;
        }
      }
    }
  };

  const checkForWinner = () => {
    let result = checkRowsForWin();
    winnerText.textContent = result ? `${result.name} Wins!` : "";
  };

  const handleClick = (boardItem, row, col) => {
    if (boardItem.textContent || isGameOver) return;
    boardItem.textContent = currentPlayer.marker;
    gameBoard.board[row][col] = currentPlayer.marker;
    checkForWinner();
    changePlayer();
  };

  const createBoard = (row, col) => {
    const boardItem = document.createElement("div");
    boardItem.className = "boardItem";
    boardItem.addEventListener("click", () => handleClick(boardItem, row, col));
    boardContainer.appendChild(boardItem);
  };

  const render = () => {
    for (let i = 0; i < gameBoard.board.length; i++) {
      for (let j = 0; j < gameBoard.board[i].length; j++) {
        createBoard(i, j);
      }
    }
  };

  return { render };
})(gameBoard);

game.render();
