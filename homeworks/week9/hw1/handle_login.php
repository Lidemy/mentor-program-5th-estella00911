<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');


  if(
  	empty($_POST['username']) ||
  	empty($_POST['password'])
  ) {
  	header("Location: login.php?errCode=1");
  	die();
  }
  
  $username = $_POST['username'];
  $password = $_POST['password'];


  $sql = sprintf(
  	"SELECT * FROM jean_users where username = '%s' and password = '%s'",
  	$username,
  	$password
  );
  $result = $conn->query($sql);
  if (!$result) {
    echo $conn->error;
    die();
  }


  if ($result->num_rows) {
    $_SESSION['username'] = $username;
  	header("Location: index.php");
  } else {
  	header("Location: login.php?errCode=3");
  	die();
  }


?>
