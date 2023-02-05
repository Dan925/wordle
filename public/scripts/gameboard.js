import { WORDS } from "./words";

const LETTER_STATUS = {
    CORRECT_POSITION:"green",
    INCORRECT_POSITION:"yellow",
    NOT_INCLUDED:'gray'
}

const getRandomWordFromDic= (wordDictionnary)=>wordDictionnary[Math.floor(Math.random()*wordDictionnary.length)];

const getLetterStatus = (chosenWord,letter, position)=>{
    if(position<0 || postion>=chosenWord.length) return;
    if(!chosenWord.includes(letter)) return LETTER_STATUS.NOT_INCLUDED;
    else if(chosenWord.charAt(position)===letter) return LETTER_STATUS.CORRECT_POSITION;
    else return LETTER_STATUS.INCORRECT_POSITION; 
}
const getGuessedWordStatus = (chosenWord, guessWord)=>{
    const wordStatus=guessWord.split("").reduce((previousWordStatus, letter, index)=>{
        let status = getLetterStatus(chosenWord,letter,index);
        return {...previousWordStatus,letter:status};

    },{});
    return wordStatus;
}

const GameBoard = (()=>{

    const MAX_GUESSES=6;
    const state= {
        chosenWord:getRandomWordFromDic(WORDS),
        guesses:0,
        guessWords:[],
    }

    const addGuessWord = (guessWord)=>{
        if(state.guesses>=MAX_GUESSES) return;
        const wordStatus = getGuessedWordStatus(state, guessWord);
        state={
            ...state,
            guesses:state.guesses+1,
            guessWords: [...state.guessWords,wordStatus]
        }
    };

    return{
        state,
        addGuessWord
    }
})()




