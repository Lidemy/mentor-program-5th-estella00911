<?php
  require_once('conn.php');
  session_start();

  $user_admin = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    if ($username == 'admin') {
      $user_admin = $username;
    }
  }

  if (
  	empty($_POST['title']) ||
  	empty($_POST['category']) ||
  	empty($_POST['content']) 
  ) {
  	header('Location: add_post.php?errCode=1');
  	die();
  }

  $title = $_POST['title'];
  $category = $_POST['category'];
  $content = $_POST['content'];

  if ($username == $user_admin) {
    $sql = 'INSERT INTO jean_w11_blog_posts (title, category, content) VALUES (?, ?, ?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $title, $category, $content);
    $result = $stmt->execute();

    if (!$result) {
    	echo $conn->error;
    	die();
    }

    header('Location: index.php');
  }
?>
