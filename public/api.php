<?php
require_once('_config.php');
require_once('../app/models/wordleState.php');

session_start();
$wordle;
if(!$_SESSION['game']){
    global $wordle;
    $wordle = new WordleState();
    $_SESSION['game'] = $wordle->toJson();
}

switch ($_GET["action"] ?? "version") {
case "getState":
    $data=$_SESSION['game'];
    break;
case "checkWord":
    $data=$wordle->toJson();
    break;
case "version":
default:
    $data = ["version" => "1.0"];
}

if($_POST["data"]){
    $word = $_POST["data"];
    $wordle->addWordToBoard($word);
    $_SESSION['game']=$wordle->toJson();
    $data=$_SESSION['game'];
}

//TODO add  post route to add a letter to the board
//TODO add  delete route to delete last letter on the board
//TODO add  get route to reset the game



header("Content-Type: application/json");
echo json_encode($data);
