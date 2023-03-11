<?php
require_once('_config.php');
require_once('../app/models/wordleState.php');

session_start();
if (!$_SESSION['game']) {
    $_SESSION['game'] =  serialize(new WordleState());
}
$wordle = unserialize($_SESSION['game']);
switch ($_GET["action"] ?? "version") {
    case "checkWord":
        $wordle->checkWord();
        break;
    case "deleteLetter":
        $wordle->deleteLetterFromBoard();
        break;
    case "version":
        $data = ["version" => "1.0"];
}

if ($_POST["data"]) {
    $letter = $_POST["data"];
    $wordle->addLetterToBoard($letter);
}

//TODO add  get route to reset the game

$data = $wordle->toJson();
header("Content-Type: application/json");
echo json_encode($data);
