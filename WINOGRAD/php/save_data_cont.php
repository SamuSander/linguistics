<?php

include('database_access.php');

$data_array = json_decode(file_get_contents('php://input'), true);
$table_data = $data_array['tblname'];
unset($data_array['tblname']);

echo "Received data: " . print_r($data_array, true) . "<br>";

try {
  // Create a PDO connection
  echo "Connecting to database...<br>";
  $conn = new PDO("mysql:host=$servername;port=$port;dbname=$dbname", $username, $password);

  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Get column names from the table
  echo "Preparing statement to get columns...<br>";
  $stmt = $conn->prepare("SHOW COLUMNS FROM `$table_data`");
  $stmt->execute();

  $col_names = array();
  while($row = $stmt->fetchColumn()) {
    $col_names[] = $row;
  }

  echo "Column names: " . print_r($col_names, true) . "<br>";

  // Create prepared SQL statement
  $sql = "INSERT INTO $table_data VALUES(";

  for($i = 0; $i < count($col_names); $i++){
    $name = $col_names[$i];
    $sql .= ":$name";
    if($i != count($col_names)-1){
      $sql .= ", ";
    }
  }
  $sql .= ");";

  echo "SQL statement: $sql<br>";

  $insertstmt = $conn->prepare($sql);

  // Bind and execute the insert statement for each row of data
  for($i=0; $i < count($data_array); $i++){
    echo "Inserting data for row $i<br>";
    for($j = 0; $j < count($col_names); $j++){
      $colname = $col_names[$j];
      if(!isset($data_array[$i][$colname])){
        $insertstmt->bindValue(":$colname", null, PDO::PARAM_NULL);
        echo "Binding NULL to column $colname<br>";
      } else {
        $insertstmt->bindValue(":$colname", $data_array[$i][$colname]);
        echo "Binding value to column $colname: " . $data_array[$i][$colname] . "<br>";
      }
    }
    $insertstmt->execute();
    echo "Row $i inserted successfully<br>";
  }

  $r = array('success' => true);
  echo json_encode($r);

} catch(PDOException $e) {
  $r = array('success' => false, 'error_message' => $e->getMessage());
  echo "Error: " . $e->getMessage() . "<br>";
  echo json_encode($r);
}

$conn = null;


// include('database_access.php');

// $data_array = json_decode(file_get_contents('php://input'), true);
// $table_data = $data_array['tblname'];
// unset($data_array['tblname']);

// try {
//   $conn = new PDO("mysql:host=$servername;port=$port;dbname=$dbname", $username, $password);

//   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//   // First stage is to get all column names from the table and store
//   // them in $col_names array.
//   $stmt = $conn->prepare("SHOW COLUMNS FROM `$table_data`");

//   $stmt->execute();

//   $col_names = array();
//   while($row = $stmt->fetchColumn()) {
//     $col_names[] = $row;
//   }

//   // Second stage is to create prepared SQL statement using the column
//   // names as a guide to what values might be in the JSON.
//   // If a value is missing from a particular trial, then NULL is inserted
//   $sql = "INSERT INTO $table_data VALUES(";

//   for($i = 0; $i < count($col_names); $i++){
//     $name = $col_names[$i];
//     $sql .= ":$name";
//     if($i != count($col_names)-1){
//       $sql .= ", ";
//     }
//   }
//   $sql .= ");";

//   $insertstmt = $conn->prepare($sql);

//   for($i=0; $i < count($data_array); $i++){

//     for($j = 0; $j < count($col_names); $j++){
//       $colname = $col_names[$j];
//       if(!isset($data_array[$i][$colname])){
//         $insertstmt->bindValue(":$colname", null, PDO::PARAM_NULL);
//       } else {
//         $insertstmt->bindValue(":$colname", $data_array[$i][$colname]);
//       }
//     }

//     $insertstmt->execute();
//   }

//   $r = array('success' => true);
//   echo json_encode($r);

// } catch(PDOException $e) {
//   $r = array('success' => false, 'error_message' => $e->getMessage());
//   echo json_encode($r);
// }

// $conn = null;

?>
