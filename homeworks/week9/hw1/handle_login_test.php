<?php
  require_once('conn.php');

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf(
  	"SELECT * FROM jean_users where password = '%s'",
  	// "SELECT * FROM jean_users where username = '%s' and password = '%s'",
  	$password
  );
  $result = $conn->query($sql);
  print_r($result);
  echo '<br>';
  // print_r($result['num_rows']);
  print_r($result->num_rows);


  if (!$result) {
  	echo $conn->error;
  	echo 'failed to login';
  	die();
  }
?>
