<?php
require '../../app/common.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'sensorTimeSeriesPost.php';
  exit;
}
$sensorId = intval($_GET['sensorId'] ?? 0);
$turbineId = intval($_GET['turbineId'] ?? 0);
if ($sensorId < 1) {
  throw new Exception('Invalid SensorDeployed ID');
}
// 1. Go to the database and get all work associated with the $taskId
$sensorTimeArr = SensorTimeSeries::getSensorTimeById($sensorId, $turbineId);
// 2. Convert to JSON
$json = json_encode($sensorTimeArr, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
