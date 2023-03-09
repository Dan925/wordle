
const MAX_GUESSES = 6;
const MAX_WORD_LENGTH=5;
let currentCell = 0;
let currentWord = "";
const gameCells = document.querySelectorAll('.board-cell');
const keyBtns = document.querySelectorAll('.key-button');
const resultsElem = document.querySelector('.results');
const resetBtn = document.createElement('button')

// TODO delete the next 3 functions cause it should be implemented in wordleState.php
const handleAddLetterToCell = (letter) => {
    if (currentCell >= MAX_WORD_LENGTH*MAX_GUESSES || currentWord.length>=MAX_WORD_LENGTH) return;
    currentWord += letter;
    gameCells[currentCell].textContent = letter;
    currentCell++;
}

const handleDeleteLetter = () => {
    if (currentCell <= 0) return;
    currentCell--;
    currentWord = currentWord.slice(0, currentWord.length - 1)
    const cellNumber = getCurrentCellPosition();
    gameCells[cellNumber].textContent = "";

}

const handleSubmitWord = () => {
    if (currentWord.length < MAX_WORD_LENGTH) return;
    const newState = $.post("api.php",
        { data: currentWord },
        function(data, status) {
            console.log("data", data);
            console.log("status", status);
        }
    )
    drawBoard(newState);
    currentWord = "";
}


const drawBoard = (gameState) => {
    console.log('in here',gameState);
    currentCell=gameState.currentBoardCell;
    for (let wordStatus of gameState.board) {
            const cellNumber = 0;
        for (let i = 0; i < wordStatus.length; i++) {
            gameCells[cellNumber].classList.add(wordStatus[i].status);
            handleAddLetterToCell(wordStatus[i].letter);
            for (let key of keyBtns) {
                if (key.value === wordStatus[i].letter) {
                    key.classList.remove("green", "yellow", "gray");
                    key.classList.add(wordStatus[i].status);
                    break;
                }
            }
        }
    }

    if (WordleState.hasWon()) {

        resultsElem.textContent = `You have won in ${WordleState.getGuessCount()} guesses!!!`
        resetBtn.classList.add("reset-btn");
        resetBtn.textContent = "Reset";
        resultsElem.appendChild(resetBtn);


    }
    if (WordleState.getGuessCount() == MAX_GUESSES && !WordleState.hasWon()) {
        resultsElem.textContent = `You have failed to guess the word: "${WordleState.getChosenWord()}". It's ok you can try a new word`
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
