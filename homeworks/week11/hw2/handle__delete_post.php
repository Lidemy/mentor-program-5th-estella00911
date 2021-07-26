<?php
  require_once('conn.php');
  session_start();

  $id = $_GET['id'];
  $user_admin = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    if ($username == 'admin') {
      $user_admin = $username;
    }
  }

  if ($username == $user_admin) {
	  $sql = 'UPDATE jean_w11_blog_posts SET is_deleted = 1 WHERE id = ?';
	  $stmt = $conn->prepare($sql);
	  $stmt->bind_param('i', $id);
	  $result = $stmt->execute();

	  if (!$result) {
	  	echo $conn->error;
	  	die();
	  }
	  header('Location: index.php');
	}
?>