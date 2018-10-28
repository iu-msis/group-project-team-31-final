<?php

$client = new Client($_POST);
$client->update();
echo json_encode($client);
