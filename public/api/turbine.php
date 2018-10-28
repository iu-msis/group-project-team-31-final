<?php
require '../../app/common.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'turbinePost.php';
  exit;
}
$turbineId = intval($_GET['turbineId'] ?? 0);
if ($turbineId < 1) {
  throw new Exception('Invalid Turbine ID');
}
// 1. Go to the database and get all work associated with the $taskId
$turbineArr = Turbine::getTurbineById($turbineId);
// 2. Convert to JSON
$json = json_encode($turbineArr, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
