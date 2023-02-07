
let currentCell = 0;
let currentWord="";
const gameCells = document.querySelectorAll('.board-cell');
const resultsElem = document.querySelector('.results');
const resetBtn = document.createElement('button');

const getCurrentCellPosition = (wordPosition=WordleState.getGuessCount(),cellPosition=currentCell)=>wordPosition*MAX_WORD_LENGTH + cellPosition;

const handleAddLetterToCell = (letter)=>{
    const cellNumber = getCurrentCellPosition();
    if(currentCell>=MAX_WORD_LENGTH || WordleState.hasWon())return;
    currentWord+=letter;
    gameCells[cellNumber].textContent = letter;
    currentCell++;
}

const handleDeleteLetter = ()=>{
    currentCell--;
    currentWord=currentWord.slice(0,currentWord.length-1)
    const cellNumber = getCurrentCellPosition();
    gameCells[cellNumber].textContent="";
    
}

const handleSubmitWord = ()=>{
    if(currentWord.length<MAX_WORD_LENGTH)return;
    const wordStatus = WordleState.addGuessWord(currentWord);
    updateBoard(wordStatus);
    currentWord="";
    currentCell=0;
}


const updateBoard=(wordStatus)=>{
    for(let i=0;i<5;i++){
        const cellNumber = getCurrentCellPosition(WordleState.getGuessCount()-1,i);
        gameCells[cellNumber].classList.add(wordStatus[i])
    }
    if(WordleState.hasWon()){
        resultsElem.textContent=`You have won in ${WordleState.getGuessCount()} guesses!!!`
        resultsElem.appendChild(resetBtn);
    
    }
   

}

const handleResetBoard = ()=>{
    currentWord="";
    currentCell=0; 
    WordleState.reset();
    gameCells.forEach(cell=>{
        cell.textContent="";
        cell.classList.remove("green","yellow","gray");
    })
    resultsElem.textContent="";
    resultsElem.removeChild(resetBtn);

}

resetBtn.addEventListener('click',handleResetBoard);