<?php
require '../../app/common.php';

$clientId = intval($_GET['clientId'] ?? 0);

if ($clientId < 1) {
  throw new Exception('Invalid Client ID');
}
// 1. Go to the database and get all work associated with the $taskId
$turbineSiteArr = TurbineSite::getTurbineDepBySiteId($clientId);
// 2. Convert to JSON
$json = json_encode($turbineSiteArr, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
