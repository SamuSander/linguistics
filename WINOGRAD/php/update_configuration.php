<?php

	include("database_access.php");

	$conn = new mysqli($servername, $username, $password, $dbname);

	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$data = json_decode($_POST['x'], true);

	foreach($data as $elem){
		extract($elem);
		$results = $conn->query("UPDATE `$tblname` SET `$colname` = '$varname' WHERE `$varwher` = '$vareqls'");
	}
?>
