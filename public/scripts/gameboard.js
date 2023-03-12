
const MAX_GUESSES = 6;
const MAX_WORD_LENGTH = 5;
let currentCell = 0;
const gameCells = document.querySelectorAll('.board-cell');
const keyBtns = document.querySelectorAll('.key-button');
const resultsElem = document.querySelector('.results');
const resetBtn = document.createElement('button')

const handleAddLetter = (letter) => {
    $.post("api.php",
        { data: letter },
        function(data, _) {
            console.log("data: ", data)
            if (data.currentBoardCell != currentCell) {
                gameCells[currentCell].textContent = letter;
                currentCell = data.currentBoardCell;
            }
        }
    )
}
const handleDeleteLetter = () => {
    $.get("api.php?action=deleteLetter",
        function(data, _) {
            if (data.currentBoardCell != currentCell) {
                console.log("deleted data: ", data)
                currentCell = data.currentBoardCell;
                gameCells[currentCell].textContent = "";
            }
        }
    )

}

const handleSubmitWord = () => {
    $.get("api.php?action=checkWord",
        function(data, status) {
            console.log("data", data);
            console.log("status", status);
            drawBoard(data);
        }
    )
}


const drawBoard = (gameState) => {
    currentCell = gameState.currentBoardCell;
    let cellNumber = 0;
    for (let wordStatus of gameState.board) {
        for (let i = 0; i < wordStatus.length; i++) {
            wordStatus[i].status && gameCells[cellNumber].classList.add(wordStatus[i].status);
            gameCells[cellNumber].textContent = wordStatus[i].letter;
            for (let key of keyBtns) {
                if (key.value === wordStatus[i].letter) {
                    key.classList.remove("green", "yellow", "gray");
                    wordStatus[i].status && key.classList.add(wordStatus[i].status);
                    break;
                }
            }
            cellNumber++;
        }
    }

    if (gameState.hasWon) {

        resultsElem.textContent = `You have won in ${gameState.guessCount} guesses!!!`
        resetBtn.classList.add("reset-btn");
        resetBtn.textContent = "Reset";
        resultsElem.appendChild(resetBtn);


    }
    if (gameState.guessCount == MAX_GUESSES && !gameState.hasWon) {
        resultsElem.textContent = `You have failed to guess the word: "${gameState.chosenWord}". It's ok you can try a new word`
        resetBtn.classList.add("reset-btn");
        resetBtn.textContent = "Reset";
        resultsElem.appendChild(resetBtn);


    }


}

const handleResetBoard = () => {
    currentWord = "";
    currentCell = 0;
    WordleState.reset();
    gameCells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("green", "yellow", "gray");
    });
    keyBtns.forEach(key => key.classList.remove("green", "yellow", "gray"))
    resultsElem.textContent = "";

}

resetBtn.addEventListener('click', handleResetBoard);
