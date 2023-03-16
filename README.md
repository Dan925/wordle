# Wordle

---

- Author: Dan Ngendahayo
- Short Description: Wordle game using PHP, HTML, CSS and JS


## How to run
- Navigate to the `public` directory and in a terminal enter the command `php -S localhost:8000`
- In the browser go to `http://localhost:8000` 

## PHP server structure
- The Game state will be saved and handled with PHP, meaning: the words and every letter color, the current guess count and current board cell position
- The `SESSION` super global is used to keep track of the state between refreshs.

## Gameplay

- The game starts with an empty 6x5 grid where the player inputs a 5 letter word trying to guess the word that has been chosen by the computer.
- The player has to use the keyboard buttons at the bottom of the screen to input his guess word:
  - the `delete` button works as expected and should erase the last letter
  - the `enter` button will submit the word to check if it matches the chosen word
- The player has 6 chances to guess the chosen word right but the game will hint correct letters in the following manner:
  - After submitting a word:
    - If a specific letter is included in the chosen word and is in the same position, the corresponding grid cell will turn green.
    - If the letter is inside the word but not in the same place then the grid cell will turn yellow.
    - If the grid cell will turn dark-gray.
- The game ends when the player guesses right or doesn't after 6 attempts.
  - If the player is successful at guessing the chosen word within his 6 chances, a message should appear above the grid showing how many chances it took and present a reset button to start the game over with a brand new word.
  - If the player doesn't guess the word right after 6 attempts, a message will show what the chosen word was and have a reset button.

## Screenshots

![Playing game screenshot](/docs/assets/playingState.png)
![Game lost screenshot](/docs/assets/lostState.png)
![Game won screenshot](/docs/assets/wonState.png)

## Version 1 System Design Link
- [System Design Document](./docs//design_system.md)
