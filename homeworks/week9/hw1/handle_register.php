<?php
  require_once('conn.php');
  session_start();
  if (
  	empty($_POST['nickname']) || 
  	empty($_POST['username']) ||
  	empty($_POST['password'])
	) {
  	header("Location: register.php?errCode=1");
  	die();
	}

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf(
  	"INSERT INTO jean_users(nickname, username, password) VALUES('%s', '%s', '%s')",
  	$nickname, 
  	$username, 
  	$password
  );

  $result = $conn->query($sql);


  if(!$result) {
  	$errCode = $conn->errno;
  	if ($errCode === 1062) {
  		header("Location: register.php?errCode=2");
  		die();
  	}
  	echo $conn->error;
  	die();
  };
  
  $_SESSION['username'] = $username;
  header("Location: index.php");
?>




