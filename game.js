const board = document.getElementById("board");
const welcomeMsg = document.getElementById("welcomeMsg");

// Get name & room from URL
const params = new URLSearchParams(window.location.search);
const playerName = params.get("name") || "Player";
const room = params.get("room") || "room";

welcomeMsg.textContent = `Hello ${playerName}, welcome to room "${room}"!`;

// Game board size
const size = 10;
const totalCells = size * size;

// Snakes and ladders
const snakes = {
  99: 54,  // big snake
  70: 55,
  52: 42,
  25: 2
};

const ladders = {
  3: 22,
  5: 8,
  11: 26,
  20: 29
};

// Players
let playerPos = 1;

// Draw board
function drawBoard() {
  board.innerHTML = "";
  for (let row = size - 1; row >= 0; row--) {
    for (let col = 0; col < size; col++) {
      let actualCol = row % 2 === 0 ? col : size - 1 - col;
      const cellNum = row * size + actualCol + 1;

      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (snakes[cellNum]) cell.classList.add("snake");
      if (ladders[cellNum]) cell.classList.add("ladder");

      // Number text
      const label = document.createElement("span");
      label.textContent = cellNum;
      cell.appendChild(label);

      // Player
      if (cellNum === playerPos) {
        const p = document.createElement("span");
        p.className = "player";
        p.textContent = "🅱️";
        cell.appendChild(p);
      }

      board.appendChild(cell);
    }
  }
}

// Roll dice
document.getElementById("rollDiceBtn").addEventListener("click", () => {
  const roll = Math.floor(Math.random() * 6) + 1;
  alert(`${playerName} rolled a ${roll}`);

  let nextPos = playerPos + roll;

  if (nextPos > totalCells) nextPos = playerPos; // don’t move

  // Snake or ladder
  if (snakes[nextPos]) {
    alert("Oops! Bitten by snake 🐍");
    nextPos = snakes[nextPos];
  } else if (ladders[nextPos]) {
    alert("Yay! Climbed a ladder 🪜");
    nextPos = ladders[nextPos];
  }

  playerPos = nextPos;
  drawBoard();
});

drawBoard();
