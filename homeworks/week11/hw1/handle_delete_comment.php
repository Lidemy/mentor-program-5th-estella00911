<?php
	require_once('conn.php');
	require_once('utils.php');
	session_start();

	$admin = NULL;
	$admin_user = 'admin';

  	$id = $_GET['id'];
  	$username = $_SESSION['username'];
  	if ($username == $admin_user) {
		$admin = $admin_user;
	}

	$sql = "UPDATE jean_comments SET is_deleted=1 where id=? and username=?";
	$stmt = $conn->prepare($sql);	
	$stmt->bind_param('is', $id, $username);
	$result = $stmt->execute();

	if (!$result) {
		die($conn->error);
	}
	
	header("Location: index.php");
?>