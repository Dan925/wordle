
const keyButtons = document.querySelectorAll('.key-button');

const handleKeyPress = (e)=>{
    console.log(e.target.value)
    if(e.target.value==='Enter'){
        handleSubmitWord();
    }
    else if(e.target.value === 'Del'){
        handleDeleteLetter();
    }
    else{
        handleAddLetterToCell(e.target.value);
    }
}
keyButtons.forEach(btn=>btn.addEventListener("click",e=>handleKeyPress(e)))