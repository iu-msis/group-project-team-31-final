<?php
require '../../app/common.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'sensorPost.php';
  exit;
}
$sensorId = intval($_GET['sensorId'] ?? 0);
if ($sensorId < 1) {
  throw new Exception('Invalid Sensor ID');
}
// 1. Go to the database and get all work associated with the $taskId
$sensorArr = Sensor::getSensorById($sensorId);
// 2. Convert to JSON
$json = json_encode($sensorArr, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
