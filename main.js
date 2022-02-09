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

  const checkForDraw = () => {
    for (let i = 0; i < gameBoard.board.length; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard.board.every((row) => row.every((el) => el !== ""))) {
          isGameOver = true;
          highlightWinningPatternRow();
          return { name: "draw" };
        }
      }
    }
  };

  const checkRowsForWin = () => {
    for (let i = 0; i < gameBoard.board.length; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard.board[i].every((el) => el === "X")) {
          isGameOver = true;
          highlightWinningPatternRow(i);
          return player1;
        } else if (gameBoard.board[i].every((el) => el === "O")) {
          isGameOver = true;
          highlightWinningPatternRow(i);
          return player2;
        }
      }
    }
  };

  const checkForWinner = () => {
    let result = checkRowsForWin() || checkForDraw();
    winnerText.textContent = result
      ? `${result.name === "draw" ? "DRAW" : result.name + " Wins!"}`
      : "";
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

  const clearBoard = () => {
    boardContainer.textContent = "";
    gameBoard.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  const highlight = (arr, bgColor) => {
    for (let node of arr) {
      node.style.backgroundColor = bgColor;
      node.style.color = "white";
    }
  };

  const highlightWinningPatternRow = (row) => {
    let nodes = Array.from(boardContainer.childNodes);
    switch (row) {
      case 0:
        nodes = nodes.slice(0, 3);
        highlight(nodes, "rgb(25, 167, 77)");
        break;
      case 1:
        nodes = nodes.slice(3, 6);
        highlight(nodes, "rgb(25, 167, 77)");
        break;
      case 2:
        nodes = nodes.slice(6, 9);
        highlight(nodes, "rgb(25, 167, 77)");
        break;
      default:
        highlight(nodes, "rgb(191, 31, 31)");
        break;
    }
  };

  const restart = () => {
    currentPlayer = player1;
    isGameOver = false;
    winnerText.textContent = "";
    clearBoard();
    render();
  };

  const render = () => {
    for (let i = 0; i < gameBoard.board.length; i++) {
      for (let j = 0; j < gameBoard.board[i].length; j++) {
        createBoard(i, j);
      }
    }
  };

  return { render, restart };
})(gameBoard);

game.render();

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "r") game.restart();
});
