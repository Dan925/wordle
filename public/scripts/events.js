
const keyButtons = document.querySelectorAll('.key-button');

const handleKeyPress = (e)=>{
    if(e.target.value==='Enter'){
        // handleSubmitWord();
        const xmlhttp = new XMLHttpRequest();

          xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
              if (xmlhttp.status == 200) {
                die1.innerHTML = xmlhttp.responseText;
              }
            }
          };

          xmlhttp.open("GET", "/api.php?action=checkWord", true);
          xmlhttp.send();
    }
    else if(e.target.value === 'Del'){
        handleDeleteLetter();
    }
    else{
        handleAddLetterToCell(e.target.value);
    }
}
keyButtons.forEach(btn=>btn.addEventListener("click",e=>handleKeyPress(e)))
