<?php

$host = "sql313.epizy.com";
$user = "epiz_26270624";
$password = "yKtXKF4sqjR1";
$database = "epiz_26270624_eleutheria";

$mysqli = new mysqli($host, $user, $password, $database);
$mysqli->query('SET NAMES "utf8"');

if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}