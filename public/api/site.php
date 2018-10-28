<?php
require '../../app/common.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'sitePost.php';
  exit;
}

$clientId = intval($_GET['clientId'] ?? 0);
if ($clientId < 1) {
  throw new Exception('Invalid CLient ID');
}
// 1. Go to the database and get all work associated with the $taskId
$siteArr = Site::getSite($clientId);
// 2. Convert to JSON
$json = json_encode($siteArr, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
