let placingStartSquare = true;
let placingEndSquare = false;
let startGuessing = false;
let startCell = 0;
let endCell = 0;
let gameState = [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."];
let guesses = 10;
const statusDisplay = document.querySelector('.game-status');
const startGame = () => "Player 1, please enter the start square for your ship";
statusDisplay.innerHTML = startGame();

function fillInP1Ship() {
    if (Math.abs(startCell - endCell) == 2) {
        if (endCell > startCell) {
            gameState[endCell - 1] = "P1";
        } else {
            gameState[startCell - 1] = "P1";
        }
    } else {
       if (endCell > startCell) {
            gameState[endCell - 6] = "P1";
        } else {
            gameState[startCell - 6] = "P1";
        } 
    }
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index')
    );
    
    if (placingStartSquare) {
        gameState[clickedCellIndex] = "P1";
        startCell = clickedCellIndex;
        placingStartSquare = false;
        placingEndSquare = true;
        statusDisplay.innerHTML = "Player 1, please enter the end square for your ship";
    }
    
    else if (placingEndSquare) {
        gameState[clickedCellIndex] = "P1";
        endCell = clickedCellIndex;
        fillInP1Ship();
        placingEndSquare = false;
        startGuessing = true;
        statusDisplay.innerHTML = `Player 2, you have ${guesses} guesses left. Please enter your guess by clicking a square above`;
    }
    
    else if (startGuessing) {
        const valAtCell = gameState[clickedCellIndex];
        if (valAtCell == "P1") {
            gameState[clickedCellIndex] = "X";
            clickedCell.innerHTML = "X";
            guesses -= 1;
        } else if (valAtCell == ".") {
            gameState[clickedCellIndex] = "O";
            clickedCell.innerHTML = "O";
            guesses -= 1;
        }
        statusDisplay.innerHTML = `Player 2, you have ${guesses} guesses left. Please enter your guess by clicking a square above`;
        if (!gameState.includes("P1")) {
            statusDisplay.innerHTML = "Player 2 wins!";
            startGuessing = false;
        } else if (guesses == 0) {
            statusDisplay.innerHTML = "Player 1 wins!";
            startGuessing = false;
        }
    }
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
