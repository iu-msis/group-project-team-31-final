<?php

$sensor = new Sensor($_POST);
$sensor->create();
echo json_encode($sensor);
