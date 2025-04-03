let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameMode = "";

function startGame(mode) {
    if (!mode) {
        alert("Please choose a game mode.");
        return;
    }
    gameMode = mode;
    board.fill("");
    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
        cell.removeAttribute("disabled"); 
    });
    document.getElementById("status").innerText = `${currentPlayer}'s Turn`;
}

function makeMove(index) {
    if (gameMode === "" || board[index] !== "") {
        return; 
    }

    board[index] = currentPlayer;
    document.querySelectorAll(".cell")[index].innerText = currentPlayer;

    if (checkWin()) {
        document.getElementById("status").innerText = `${currentPlayer} Wins!`;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (gameMode === "single" && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    } else {
        document.getElementById("status").innerText = `${currentPlayer}'s Turn`;
    }
}

function aiMove() {
    let emptyCells = board.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex);
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => pattern.every(index => board[index] === currentPlayer));
}
