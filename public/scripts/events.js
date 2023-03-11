
const keyButtons = document.querySelectorAll('.key-button');

//TODO each of these 3 actions should make a request to api.php

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
