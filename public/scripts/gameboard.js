
const MAX_GUESSES = 6;
const MAX_WORD_LENGTH = 5;
let currentCell = 0;
const gameCells = document.querySelectorAll('.board-cell');
const keyBtns = document.querySelectorAll('.key-button');
const resultsElem = document.querySelector('.results');
const resetBtn = document.createElement('button')

// TODO delete the next 3 functions cause it should be implemented in wordleState.php

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
            console.log("data: ", data)
            if (data.currentBoardCell != currentCell) {
                gameCells[currentCell].textContent = "";
                currentCell = data.currentBoardCell;
            }
        }
    )

}

const handleSubmitWord = () => {
    if (currentWord.length < MAX_WORD_LENGTH) return;
    $.get("api.php?action=checkWord",
        function(data, status) {
            console.log("data", data);
            console.log("status", status);
            drawBoard(newState);
        }
    )
}


const drawBoard = (gameState) => {
    console.log('in here', gameState);
    currentCell = gameState.currentBoardCell;
    for (let wordStatus of gameState.board) {
        let cellNumber = 0;
        console.log(wordStatus);
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

    if (wordleState.hasWon) {

        resultsElem.textContent = `You have won in ${wordleState.guessCount} guesses!!!`
        resetBtn.classList.add("reset-btn");
        resetBtn.textContent = "Reset";
        resultsElem.appendChild(resetBtn);


    }
    if (wordleState.guessCount == MAX_GUESSES && !wordleState.hasWon) {
        resultsElem.textContent = `You have failed to guess the word: "${wordleState.chosenWord}". It's ok you can try a new word`
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
