
const keyButtons = document.querySelectorAll('.key-button');

const handleKeyPress = (e)=>{
    if(e.target.value==='Enter'){
        // handleSubmitWord();
         let answer = $.ajax({
                  type: "GET",
                  url: "api.php?action=checkWord"
                }).then(function(data) {
                  console.log(data);
                })
    }
    else if(e.target.value === 'Del'){
        handleDeleteLetter();
    }
    else{
        handleAddLetterToCell(e.target.value);
    }
}
keyButtons.forEach(btn=>btn.addEventListener("click",e=>handleKeyPress(e)))
