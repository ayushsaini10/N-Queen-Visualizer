let N = 0;
let board = [];

function startVisualizer() {
  N = parseInt(document.getElementById("nValue").value);
  if (!N || N < 4 || N > 8) {
    alert("Enter a number between 4 and 8");
    return;
  }
  board = Array.from({ length: N }, () => Array(N).fill(0));
  renderBoard();
  solveNQueens(0);
}

function renderBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.style.gridTemplateColumns = `repeat(${N}, 50px)`;
  boardDiv.innerHTML = '';
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if ((i + j) % 2 === 0) cell.classList.add("dark");
      if (board[i][j] === 1) cell.innerHTML = "♛";
      boardDiv.appendChild(cell);
    }
  }
}

function isSafe(row, col) {
  for (let i = 0; i < row; i++) {
    if (board[i][col] === 1) return false;
    if (col - (row - i) >= 0 && board[i][col - (row - i)] === 1) return false;
    if (col + (row - i) < N && board[i][col + (row - i)] === 1) return false;
  }
  return true;
}

async function solveNQueens(row) {
  if (row === N) return true;

  for (let col = 0; col < N; col++) {
    if (isSafe(row, col)) {
      board[row][col] = 1;
      renderBoard();
      await new Promise(res => setTimeout(res, 300)); // delay
      if (await solveNQueens(row + 1)) return true;
      board[row][col] = 0; // backtrack
      renderBoard();
      await new Promise(res => setTimeout(res, 300));
    }
  }
  return false;
}
