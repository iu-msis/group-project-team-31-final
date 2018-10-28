<?php

$client = new ClientComment($_POST);
$client->create();
echo json_encode($client);
