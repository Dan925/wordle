
let currentCell = 0;
let currentWord="";
const gameCells = document.querySelectorAll('.board-cell');
const keyBtns = document.querySelectorAll('.key-button');
const resultsElem = document.querySelector('.results');
const resetBtn = document.createElement('button')
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
    for(let i=0;i<MAX_WORD_LENGTH;i++){
        const cellNumber = getCurrentCellPosition(WordleState.getGuessCount()-1,i);
        gameCells[cellNumber].classList.add(wordStatus[i].status);
        for(let key of keyBtns){
            if(key.value===wordStatus[i].letter){
                key.classList.remove("green","yellow","gray");
                key.classList.add(wordStatus[i].status);
                break;
            }
        }
    }

    if(WordleState.hasWon()){
        resultsElem.textContent=`You have won in ${WordleState.getGuessCount()} guesses!!!`
        resetBtn.classList.add("reset-btn");
        resetBtn.textContent="Reset";
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
    });
    keyBtns.forEach(key=>key.classList.remove("green","yellow","gray"))
    resultsElem.textContent="";

}

resetBtn.addEventListener('click',handleResetBoard);