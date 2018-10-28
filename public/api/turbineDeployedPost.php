<?php

$turbineDep = new TurbineDeployed($_POST);
$turbineDep->create();
echo json_encode($turbineDep);
