<?php
require_once('_config.php');
switch ($_GET["action"] ?? "version") {
case "checkWord":
    $data = ["value" => "hello world"];
    break;
case "version":
default:
    $data = ["version" => "1.0"];
}
header("Content-Type: application/json");
echo json_encode($data);
