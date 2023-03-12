
const keyButtons = document.querySelectorAll('.key-button');

const handleKeyPress = (e)=>{
    if(e.target.value==='Enter'){
        handleSubmitWord();
    }
    else if(e.target.value === 'Del'){
        handleDeleteLetter();
    }
    else{
        handleAddLetter(e.target.value);
    }
}
keyButtons.forEach(btn=>btn.addEventListener("click",e=>handleKeyPress(e)))
