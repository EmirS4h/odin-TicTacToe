const game = (() => {
  const gridItems = document.querySelectorAll("[data-gridItem]");
  const winnerText = document.querySelector("#winnerText");
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
  const drawBgColor = "rgb(191, 31, 31)";
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

  const checkForDraw = () => {
    let arr = Array.from(gridItems);

    let res = arr.every((el) => el.textContent !== "");

    if (res) {
      isGameOver = true;
      arr.map((el) => {
        el.style.backgroundColor = drawBgColor;
        el.style.color = "white";
      });
      winnerText.textContent = `DRAW!`;
    }
    return res;
  };

  function highlightWinningPattern(pattern, bgColor) {
    for (let path of pattern) {
      gridItems[path].style.backgroundColor = bgColor;
      gridItems[path].style.color = "white";
    }
  }

  function handleClick(element) {
    if (isGameOver || element.textContent) return;
    element.textContent = currentPlayer.marker;
    if (checkForWin(currentPlayer)) {
      isGameOver = true;
      winnerText.textContent = `${currentPlayer.name} WINS!`;
      highlightWinningPattern(winningCombinationArr, winBgColor);
      console.log(winningCombinationArr);
    }
    console.log(checkForDraw());
    changePlayer();
  }

  function restart() {
    currentPlayer = player1;
    isGameOver = false;
    winnerText.textContent = ""
    gridItems.forEach((item) => {
      item.textContent = "";
      item.style.backgroundColor = "white";
      item.style.color = "black";
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "r") restart();
  });

  gridItems.forEach((element) => {
    element.addEventListener("click", () => handleClick(element));
  });
})();
