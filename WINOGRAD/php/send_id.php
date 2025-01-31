<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include("database_access.php");

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

$Data = json_decode($_POST['x'], true);
$tblname = $Data['tblname'];

// Check if email exists, and set it to null if not present
$email = isset($Data['email']) ? $Data['email'] : null;

unset($Data['tblname']);

// Check if the table has a matching column for vpnCode
$sql = "SELECT * FROM `$tblname` WHERE `email` = '$email'";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(['success' => false, 'error' => 'Error in SELECT query: ' . $conn->error]);
    exit();
}

if ($result->num_rows == 0) {
    // Insert the data into the database
    $cols = "`" . implode("`,`", array_keys($Data)) . "`";
    $vals = "'" . implode("','", array_map([$conn, 'real_escape_string'], array_values($Data))) . "'";

    // Adjust the INSERT query to match your table structure
    $sql = "INSERT INTO `$tblname` ($cols) VALUES ($vals)";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'New record inserted']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Error in INSERT query: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Record already exists']);
}

$conn->close();
?>
