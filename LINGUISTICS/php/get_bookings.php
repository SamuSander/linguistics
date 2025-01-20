<?php

include("database_access.php");

$tblname = 'booking_overview';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$results = $conn->query("SELECT `timeslot`,`total_count` FROM `$tblname`");
$jsonData = array(); // Initialize an empty array

if (mysqli_num_rows($results) > 0) {
	// output data of each row
	while($array = mysqli_fetch_assoc($results)) {
		$jsonData[] = $array;
	}

	echo json_encode($jsonData);

} else {
	echo json_encode($jsonData);
}
