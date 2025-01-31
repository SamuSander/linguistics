<?php

include("database_access.php");

$tblname = 'drm_config';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$Data = json_decode($_POST['x'], true);
$vpnCode = $Data['vpnCode'];

$results = $conn->query(
	"SELECT `participantID`,`exp_condition`, `hint`, `status`, `part1Time`, `part2Time`, `reschedules`, `chronoType` " . 
	"FROM `$tblname` WHERE `vpnCode` = '$vpnCode'"
);

if (mysqli_num_rows($results) > 0) {
	// output data of each row
	while($row = mysqli_fetch_assoc($results)) {

	$res = array(
		"participantID" => $row["participantID"],
		"exp_condition" => $row["exp_condition"],
		"hint" => $row["hint"],
		"status" => $row["status"],
        "part1Time" => $row["part1Time"],
		"part2Time" => $row["part2Time"],
		"reschedules" => $row["reschedules"],
		"chronoType" => $row["chronoType"]
	);

	echo json_encode($res, JSON_PRETTY_PRINT);
	}
} else {
	echo "0 results";
}

?>
