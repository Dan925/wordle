# System Design

- The following document describes the design of the Wordle game built with HTML,CSS and JS

## Fonts and Colors

- **Colors**:
  - green (`#5438d4e`) ![#538d4e](https://placehold.it/20x20/538d4e/000000?text)
  - yellow ( `#b59f3b` ) ![#b59f3b](https://placehold.it/20x20/b59f3b/000000?text)
  - dark-gray ( `#3a3a3c` ) ![#3a3a3c](https://placehold.it/20x20/3a3a3c/000000?text)
  - gray ( `#818384` ) ![#818384](https://placehold.it/20x20/818384/000000?text)
- **Fonts**
  - Default Chrome Font Family

## Wordle Game Components

### Events

- `events.js` handles keyboard click events and calls the right action based on the value of the button:
  - For letters, the event handler calls a function to add the letter to the board
  - For the backspace button, the handler calls a function to delete the previous letter from the board
  - For the Enter button, the handler submits the word to check if it corresponds with the chosen word for his game session

### GameBoard

- `gameboard.js` houses the event action logic called by the event handler in `events.js`.
- The only state that this component holds is the current word being typed and next cell number from 0 to 4, where the game is supposed to enter the next letter
- This component also handle updating the board once a guessed word has been checked using a function from the `WordleState` component. This means changing the background color of the board cells and keyboard buttons

### WordleState

- `wordleState.js` contains the global game state meaning :
  - `guesses`: the current number of guesses the player has used
  - `chosenWord`: a random 5 letter word chosen from a list in the `Words` component
  - `guessWords`: an array of all the words the player has submitted stored, where each word is an array of object with `letter:state` key-value pairs.
  - `hasWon`: a boolean flag indicating if the player has correctly guessed the chosen word
- Additionally, this component has a multiple functions to assign a color to each letter of every guess word. This is referred to as a `wordStatus` and is used in the `gameBoard` component to update the board.

### Words

- `words.js` defines an array of 5 letter words where the chosen word will be picked.
