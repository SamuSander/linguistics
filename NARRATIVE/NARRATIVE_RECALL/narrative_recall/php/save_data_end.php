?php

include('database_access.php');

$data_array = json_decode(file_get_contents('php://input'), true);
$table_data = $data_array['tblname'];
unset($data_array['tblname']);
$participantID = $data_array[0]['participantID'];
$last_trial = end($data_array);
$trial = $last_trial['trial_index']+1;

///////////////////////////INSERT ALL DATA INTO BACKUP DB////////////////////////////////////

try {
  $conn = new PDO("mysql:host=$servername;port=$port;dbname=$dbname", $username, $password);

  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // First stage is to get all column names from the table and store
  // them in $col_names array.
  $stmt = $conn->prepare("SHOW COLUMNS FROM `$table_data`");

  $stmt->execute();

  $col_names = array();
  while($row = $stmt->fetchColumn()) {
    $col_names[] = $row;
  }

  // Second stage is to create prepared SQL statement using the column
  // names as a guide to what values might be in the JSON.
  // If a value is missing from a particular trial, then NULL is inserted
  $sql = "INSERT INTO $table_data VALUES(";

  for($i = 0; $i < count($col_names); $i++){
    $name = $col_names[$i];
    $sql .= ":$name";
    if($i != count($col_names)-1){
      $sql .= ", ";
    }
  }
  $sql .= ");";

  $insertstmt = $conn->prepare($sql);

// Loop through each item in the data array
for($i = 0; $i < count($data_array); $i++) {
  // Loop through each column name
  for($j = 0; $j < count($col_names); $j++) {
      $colname = $col_names[$j];

      if (!isset($data_array[$i][$colname])) {
          // If the column is not set in the data, bind NULL
          $insertstmt->bindValue(":$colname", null, PDO::PARAM_NULL);
      } else {
          // Check if the value is an array and convert it to JSON string if needed
          $value = $data_array[$i][$colname];
          if (is_array($value)) {
              $value = json_encode($value);
          }

          // Bind the value to the prepared statement
          $insertstmt->bindValue(":$colname", $value);
      }
  }

  // Execute the prepared statement
  $insertstmt->execute();
}

} 

catch(PDOException $e) {
  echo json_encode(array('success' => false));
}

////////////////////////CHECK ALL DATA WAS RECIEVED BY BACKUP DB///////////////////////////////////////

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  // die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT COUNT(*) FROM $table_data WHERE `participantID` = '$participantID'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {

if ($trial > $row["COUNT(*)"]) {
  echo "There is missing data";
  try {
  $conn = new PDO("mysql:host=$servername;port=$port;dbname=$dbname", $username, $password);

  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // First stage is to get all column names from the table and store
  // them in $col_names array.
  $stmt = $conn->prepare("SHOW COLUMNS FROM `$table_data`");

  $stmt->execute();

  $col_names = array();
  while($row = $stmt->fetchColumn()) {
    $col_names[] = $row;
  }

  // Second stage is to create prepared SQL statement using the column
  // names as a guide to what values might be in the JSON.
  // If a value is missing from a particular trial, then NULL is inserted
  $sql = "INSERT INTO $table_data VALUES(";

  for($i = 0; $i < count($col_names); $i++){
    $name = $col_names[$i];
    $sql .= ":$name";
    if($i != count($col_names)-1){
      $sql .= ", ";
    }
  }
  $sql .= ");";

  $insertstmt = $conn->prepare($sql);

  for($i=0; $i < count($data_array); $i++){

    for($j = 0; $j < count($col_names); $j++){
      $colname = $col_names[$j];
      if(!isset($data_array[$i][$colname])){
        $insertstmt->bindValue(":$colname", null, PDO::PARAM_NULL);
      } else {
        $insertstmt->bindValue(":$colname", $data_array[$i][$colname]);
      }
    }

    $insertstmt->execute();
  }
  $d = array('success' => true);
  echo json_encode($d);

} catch(PDOException $e) {
  $r = array('success' => false, 'error_message' => $e->getMessage());
  echo json_encode($r);
}

} else {
  // echo "All of the data have been entered";
  $r = array('success' => true);
  echo json_encode($r);
}

  }
} else {
  // echo "0 Results";
}
////////////////////////////////////////////////////////////////////////////

$conn = null;

?>
