<?php
require_once('_config.php');
require_once('../app/models/wordleState.php');

$wordle = new WordleState();
switch ($_GET["action"] ?? "version") {
case "checkWord":
    $data=$wordle->toJson();
    break;
case "version":
default:
    $data = ["version" => "1.0"];
}
header("Content-Type: application/json");
echo json_encode($data);
