<?php

$turbine = new Turbine($_POST);
$turbine->create();
echo json_encode($turbine);
