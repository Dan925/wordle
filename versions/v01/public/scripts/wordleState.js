const LETTER_STATUS = {
    CORRECT_POSITION:"green",
    INCORRECT_POSITION:"yellow",
    NOT_INCLUDED:'gray'
}

const getRandomWordFromDic= (wordDictionnary)=>wordDictionnary[Math.floor(Math.random()*wordDictionnary.length)];

const getLetterStatus = (chosenWord,letter, position)=>{
    if(position<0 || position>=chosenWord.length) return;
    if(!chosenWord.includes(letter)) return LETTER_STATUS.NOT_INCLUDED;
    else if(chosenWord.charAt(position)===letter) return LETTER_STATUS.CORRECT_POSITION;
    else return LETTER_STATUS.INCORRECT_POSITION; 
}
const getGuessedWordStatus = (chosenWord, guessWord)=>{
    const wordStatus=guessWord.split("").reduce((previousWordStatus, letter, index)=>{
        let status = getLetterStatus(chosenWord,letter,index);
        return [...previousWordStatus,{letter,status}]

    },[]);
    return wordStatus;
}

const MAX_WORD_LENGTH = 5;
const MAX_GUESSES=6;
const WordleState = (()=>{

    let state= {
        chosenWord:getRandomWordFromDic(WORDS),
        guesses:0,
        guessWords:[],
        hasWon:false
    }

    const getGuessCount = ()=>state.guesses;
    const hasWon =  () => state.hasWon;
    const getChosenWord = ()=>state.chosenWord;

    const addGuessWord = (guessWord)=>{
        if(state.guesses>=MAX_GUESSES) return;
        const wordStatus = getGuessedWordStatus(state.chosenWord, guessWord);
        
        state={ ...state,
            hasWon: wordStatus.every(letter=>letter.status===LETTER_STATUS.CORRECT_POSITION),
            guesses:state.guesses+1,
            guessWords: [...state.guessWords,wordStatus]
        }
        return wordStatus;
    };



    const reset = ()=>{
        state = {
            chosenWord:getRandomWordFromDic(WORDS),
            guesses:0,
            guessWords:[],
            hasWon:false
        }
    }


    return{
        getGuessCount,
        hasWon,
        addGuessWord,
        reset,
        getChosenWord
    }
})()





