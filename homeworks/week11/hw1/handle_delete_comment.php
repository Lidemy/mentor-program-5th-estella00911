<?php
	require_once('conn.php');
	require_once('utils.php');
	session_start();

	// $username = $_SESSION['username'];
  	$id = $_GET['id'];
 //  	$content = $_POST['content'];


	// if(
	// 	empty($_POST['content'])
	// ) {
	// 	$str = 'Location: update_comment.php?errCode=1&id=' . $id;
	// 	header($str);
	// 	die();
	// }
	$sql = "UPDATE jean_comments SET is_deleted=1 where id=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('i', $id);
	$result = $stmt->execute();

	if (!$result) {
		die($conn->error);
	}
	
	header("Location: index.php");
?>