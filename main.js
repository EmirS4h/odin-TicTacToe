// const boardContainer = document.querySelector(".boardContainer");
// const winnerText = document.querySelector("#winnerText");

// const gameBoard = (() => {
//   let board = [
//     ["", "", ""],
//     ["", "", ""],
//     ["", "", ""],
//   ];
//   return { board };
// })();

// const game = ((gameBoard) => {

//   const checkForDraw = () => {
//     for (let i = 0; i < gameBoard.board.length; i++) {
//       for (let j = 0; j < 3; j++) {
//         if (gameBoard.board.every((row) => row.every((el) => el !== ""))) {
//           isGameOver = true;
//           highlightWinningPatternRow();
//           return { name: "draw" };
//         }
//       }
//     }
//   };
//   /*
// [0,1,2]
// [3,4,5]
// [6,7,8]
// */
//   const checkRowsForWin = () => {
//     for (let i = 0; i < gameBoard.board.length; i++) {
//       for (let j = 0; j < 3; j++) {
//         if (gameBoard.board[i].every((el) => el === "X")) {
//           isGameOver = true;
//           highlightWinningPatternRow(i);
//           return player1;
//         } else if (gameBoard.board[i].every((el) => el === "O")) {
//           isGameOver = true;
//           highlightWinningPatternRow(i);
//           return player2;
//         }
//       }
//     }
//   };

//   const checkColumnsForWin = () => {
//     let col1 = [
//       gameBoard.board[0][0],
//       gameBoard.board[1][0],
//       gameBoard.board[2][0],
//     ];
//     let col2 = [
//       gameBoard.board[0][1],
//       gameBoard.board[1][1],
//       gameBoard.board[2][1],
//     ];
//     let col3 = [
//       gameBoard.board[0][2],
//       gameBoard.board[1][2],
//       gameBoard.board[2][2],
//     ];

//     let xWon = col1.every(el => el === "X") || col2.every(el => el === "X") || col3.every(el => el === "X")
//     let oWon = col1.every(el => el === "O") || col2.every(el => el === "O") || col3.every(el => el === "O")
//     return xWon ? xWon : oWon;
//   };

//   const checkForWinner = () => {
//     let result = checkRowsForWin() || checkForDraw();
//     winnerText.textContent = result
//       ? `${result.name === "draw" ? "DRAW" : result.name + " Wins!"}`
//       : "";
//   };

//   const handleClick = (boardItem, row, col) => {
//     if (boardItem.textContent || isGameOver) return;
//     boardItem.textContent = currentPlayer.marker;
//     gameBoard.board[row][col] = currentPlayer.marker;
//     console.log(checkColumnsForWin());
//     checkForWinner();
//     changePlayer();
//   };

//   const createBoard = (row, col) => {
//     const boardItem = document.createElement("div");
//     boardItem.className = "boardItem";
//     boardItem.addEventListener("click", () => handleClick(boardItem, row, col));
//     boardContainer.appendChild(boardItem);
//   };

//   const clearBoard = () => {
//     boardContainer.replaceChildren();
//     gameBoard.board = [
//       ["", "", ""],
//       ["", "", ""],
//       ["", "", ""],
//     ];
//   };

//   const highlight = (arr, bgColor) => {
//     for (let node of arr) {
//       node.style.backgroundColor = bgColor;
//       node.style.color = "white";
//     }
//   };

//   const highlightWinningPatternRow = (row) => {
//     let nodes = Array.from(boardContainer.childNodes);
//     switch (row) {
//       case 0:
//         nodes = nodes.slice(0, 3);
//         highlight(nodes, "rgb(25, 167, 77)");
//         break;
//       case 1:
//         nodes = nodes.slice(3, 6);
//         highlight(nodes, "rgb(25, 167, 77)");
//         break;
//       case 2:
//         nodes = nodes.slice(6, 9);
//         highlight(nodes, "rgb(25, 167, 77)");
//         break;
//       default:
//         highlight(nodes, "rgb(191, 31, 31)");
//         break;
//     }
//   };

//   const restart = () => {
//     currentPlayer = player1;
//     isGameOver = false;
//     winnerText.textContent = "";
//     clearBoard();
//     render();
//   };

//   const render = () => {
//     for (let i = 0; i < gameBoard.board.length; i++) {
//       for (let j = 0; j < gameBoard.board[i].length; j++) {
//         createBoard(i, j);
//       }
//     }
//   };

//   return { render, restart };
// })(gameBoard);

// game.render();

const gridItems = document.querySelectorAll("[data-gridItem]");
const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const createPlayer = (name, marker) => {
  return { name, marker };
};

const changePlayer = () => {
  currentPlayer === player1
    ? (currentPlayer = player2)
    : (currentPlayer = player1);
};

const player1 = createPlayer("Player1", "X");
const player2 = createPlayer("Player2", "O");

let currentPlayer = player1;
let isGameOver = false;
let winningCombinationArr = null;

const checkForWin = (currentPlayer) => {
  return winningCombination.some((combo) => {
    return combo.every((i) => {
      let res = gridItems[i].textContent === currentPlayer.marker;
      if (res) {
        winningCombinationArr = combo;
        return true;
      }
    });
  });
};

const checkForGameOver = () => {};

function handleClick(item) {
  if (isGameOver || item.textContent) return;
  item.textContent = currentPlayer.marker;
  let result = checkForWin(currentPlayer);
  if (result) {
    isGameOver = true;
    console.log(result);
    console.log(winningCombinationArr);
  }
  changePlayer();
}

function restart() {
  currentPlayer = player1;
  isGameOver = false;
  gridItems.forEach((item) => (item.textContent = ""));
}

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "r") restart();
});

gridItems.forEach((item) => {
  item.addEventListener("click", () => handleClick(item));
});
