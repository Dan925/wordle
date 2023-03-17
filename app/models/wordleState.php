<?php
class  WordleState
{

    public $board;
    public $chosenWord;
    public $hasWon;
    public $guessCount;
    public $currentBoardCell;
    public $currentBestScore = 9999;
    public $gamesWon = 0;
    public $gamesPlayed = 0;

    private $CORRECT_POSITION = "CORRECT_POSITION";
    private $INCORRECT_POSITION = "INCORRECT_POSITION";
    private $NOT_INCLUDED = "NOT_INCLUDED";

    private $LETTER_STATUS = array(
        "CORRECT_POSITION" => "green",
        "INCORRECT_POSITION" => "yellow",
        "NOT_INCLUDED" => "gray",
    );

    private $MAX_WORD_LENGTH = 5;
    private $MAX_GUESSES = 6;

    private $WORDS = array(
        "which",
        "there",
        "their",
        "about",
        "would",
        "these",
        "other",
        "words",
        "could",
        "write",
        "first",
        "water",
        "after",
        "where",
        "right",
        "think",
        "three",
        "years",
        "place",
        "sound",
        "great",
        "again",
        "still",
        "every",
        "small",
        "found",
        "those",
        "never",
        "under",
        "might",
        "while",
        "house",
        "world",
        "below",
        "asked",
        "going",
        "large",
        "until",
        "along",
        "shall",
        "being",
        "often",
        "earth",
        "began",
        "since",
        "study",
        "night",
        "light",
        "above",
    );
    private $lastWordWasChecked = false;

    public function __construct()
    {
        $this->resetGame();
    }

    public function resetGame()
    {
        $this->board = array();
        $this->guessCount = 0;
        $this->currentBoardCell = 0;
        $this->hasWon = false;
        $this->chosenWord = $this->getRandomWordFromDic();
    }

    private function getRandomWordFromDic()
    {
        return $this->WORDS[rand(0, count($this->WORDS) - 1)];
    }

    private function computeLetterStatus($letter, $position)
    {
        if ($position < 0 or $position >= strlen($this->chosenWord)) return;
        $chosenWord = str_split($this->chosenWord);
        if (strpos($this->chosenWord, $letter) === false) return $this->LETTER_STATUS[$this->NOT_INCLUDED];
        elseif ($chosenWord[$position] == $letter) return $this->LETTER_STATUS[$this->CORRECT_POSITION];
        else return $this->LETTER_STATUS[$this->INCORRECT_POSITION];
    }
    public function checkWord()
    {
        if ($this->hasWon) return;
        $wordLength = count($this->board[$this->guessCount]);
        if ($wordLength < $this->MAX_WORD_LENGTH) return;
        $strWord = "";
        for ($i = 0; $i < $wordLength; $i++) {
            $currLetter = $this->board[$this->guessCount][$i]["letter"];
            $this->board[$this->guessCount][$i]["status"] = $this->computeLetterStatus($currLetter, $i);
            $strWord = $strWord . $currLetter;
        }
        $this->guessCount = $this->guessCount + 1;
        $this->lastWordWasChecked = true;

        if ($strWord == $this->chosenWord) {
            $this->hasWon = true;
            if ($this->guessCount < $this->currentBestScore) $this->currentBestScore = $this->guessCount;
        }
        if ($this->guessCount == $this->MAX_GUESSES or $this->hasWon) {

            $this->updateStats();
        }
    }

    public function updateStats()
    {
        $this->gamesPlayed = $this->gamesPlayed + 1;
        if ($this->hasWon) $this->gamesWon = $this->gamesWon + 1;
    }

    public function deleteLetterFromBoard()
    {
        $wordCell = $this->currentBoardCell % $this->MAX_WORD_LENGTH;
        // wont work if at end of the word and the current word
        if ($this->currentBoardCell == 0 or ($wordCell == 0 and $this->lastWordWasChecked)) return;
        $this->currentBoardCell = $this->currentBoardCell - 1;
        array_pop($this->board[$this->guessCount]);
        if (count($this->board[$this->guessCount]) == 0)
            array_pop($this->board);
    }

    public function addLetterToBoard($letter)
    {
        if ($this->guessCount >= $this->MAX_GUESSES || $this->hasWon) return;
        if ($this->board[$this->guessCount]) {
            if (count($this->board[$this->guessCount]) >= $this->MAX_WORD_LENGTH) return;
            array_push($this->board[$this->guessCount], array("letter" => $letter, "status" => ""));
        } else {
            array_push($this->board, array(array("letter" => $letter, "status" => "")));
        }
        $this->currentBoardCell = $this->currentBoardCell + 1;
    }


    public function toJson()
    {
        return [
            "board" => $this->board,
            "hasWon" => $this->hasWon,
            "guessCount" => $this->guessCount,
            "chosenWord" => $this->chosenWord,
            "currentBoardCell" => $this->currentBoardCell,
            "currentBestScore" => $this->currentBestScore,
            "gamesWon" => $this->gamesWon,
            "gamesPlayed" => $this->gamesPlayed,
        ];
    }

    public function toEncodedJson()
    {
        return json_encode($this->toJson());
    }
}
