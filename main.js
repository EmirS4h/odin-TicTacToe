const game = (() => {
  const gridItems = document.querySelectorAll("[data-gridItem]");
  const resultText = document.querySelector("#resultText");
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
  const winBgColor = "rgb(25, 167, 77)";
  const winDrawColor = "white";
  const drawBgColor = "rgb(191, 31, 31)";
  const defaultBgColor = "white";
  const defaultColor = "black";

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
    return winningCombination.some((combination) => {
      return combination.every((item) => {
        let res = gridItems[item].textContent === currentPlayer.marker;
        if (res) {
          winningCombinationArr = combination;
          return true;
        }
      });
    });
  };

  const checkForDraw = () => {
    const gridItemsArr = Array.from(gridItems);

    const res = gridItemsArr.every((item) => item.textContent !== "");

    if (res) {
      isGameOver = true;
      highlightDraw(gridItemsArr);
      resultText.textContent = `DRAW!`;
    }
    return res;
  };

  function highlightDraw(gridItemsArr) {
    gridItemsArr.map((item) => {
      item.style.backgroundColor = drawBgColor;
      item.style.color = winDrawColor;
    });
  }

  function highlightWinningPattern(pattern, bgColor) {
    for (let item of pattern) {
      gridItems[item].style.backgroundColor = bgColor;
      gridItems[item].style.color = winDrawColor;
    }
  }

  function handleClick(element) {
    if (isGameOver || element.textContent) return;
    element.textContent = currentPlayer.marker;
    if (checkForWin(currentPlayer)) {
      isGameOver = true;
      resultText.textContent = `${currentPlayer.name} WINS!`;
      highlightWinningPattern(winningCombinationArr, winBgColor);
      console.log(winningCombinationArr);
    } else {
      changePlayer();
      resultText.textContent = `${currentPlayer.name}'s Turn`;
      checkForDraw();
    }
  }

  function restart() {
    currentPlayer = player1;
    isGameOver = false;
    resultText.textContent = `${currentPlayer.name}'s Turn`;
    gridItems.forEach((item) => {
      item.textContent = "";
      item.style.backgroundColor = defaultBgColor;
      item.style.color = defaultColor;
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "r") restart();
  });

  gridItems.forEach((element) => {
    element.addEventListener("click", () => handleClick(element));
  });

  resultText.textContent = currentPlayer.name + "' Turn"
})();
