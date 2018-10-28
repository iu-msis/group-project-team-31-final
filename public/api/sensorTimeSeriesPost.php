<?php

$sensorTime = new SensorTimeSeries($_POST);
$sensorTime->create();
echo json_encode($sensorTime);
