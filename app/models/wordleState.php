<?php
class  WordleState
{

    public $board;
    public $chosenWord;
    public $hasWon;
    public $guessCount;
    public $currentBoardCell;

    private $CORRECT_POSITION = "CORRECT_POSITION";
    private $INCORRECT_POSITION = "INCORRECT_POSITION";
    private $NOT_INCLUDED = "NOT_INCLUDED";

    private $LETTER_STATUS = array(
        "CORRECT_POSITION" => "green",
        "INCORRECT_POSITION" => "yellow",
        "NOT_INCLUDED" => "gray",
    );

    private $MAX_WORD_LENGTH = $this->MAX_WORD_LENGTH;
    private $MAX_GUESSES = $this->MAX_GUESSES;

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

    public function __construct()
    {
        $this->resetGame();
    }

    public function resetGame()
    {
        $this->board = [];
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
        if ($position < 0 or $position >= count($this->chosenWord)) return;
        $chosenWord = str_split($this->chosenWord);
        if (!str_contains($this->chosenWord, $letter)) return $this->LETTER_STATUS[$this->NOT_INCLUDED];
        elseif ($chosenWord[$position] != $letter) return $this->LETTER_STATUS[$this->CORRECT_POSITION];
        else return $this->LETTER_STATUS[$this->INCORRECT_POSITION];
    }
    public function addWordToBoard()
    {
        $wordLength = count($this->board[$this->guessCount]);
        if ($wordLength < $this->MAX_WORD_LENGTH) return;
        // TODO: go through the current guess word and update the status of each letter
        // increment guessCount
        // check if guessWord match with chosenWord

        $this->guessCount = $this->guessCount + 1;
        $this->currentBoardCell = 0;
    }

    public function deleteLetterFromBoard()
    {
        if ($this->currentBoardCell == 0) return;
        $this->currentBoardCell = $this->currentBoardCell - 1;
        array_pop($this->board[$this->guessCount]);
    }

    public function addLetterToBoad($letter)
    {
        if ($this->guessCount >= $this->MAX_GUESSES) return;
        if ($this->board[$this->guessCount]) {
            if (count($this->board[$this->guessCount]) >= $this->MAX_WORD_LENGTH) return;
            $this->board[$this->guessCount] += ["letter" => $letter, "status" => ""];
        } else {
            $this->board[$this->guessCount] = array("letter" => $letter, "status" => "");
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
        ];
    }

    public function toEncodedJson()
    {
        return json_encode($this->toJson());
    }
}
