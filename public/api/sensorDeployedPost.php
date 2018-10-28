<?php

$sensorDep = new SensorDeployed($_POST);
$sensorDep->create();
echo json_encode($sensorDep);
