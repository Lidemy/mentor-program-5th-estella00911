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
      header('Location: update_post.php?errCode=1');
      die();
  }
  $title = $_POST['title'];
  $category = $_POST['category'];
  $content = $_POST['content'];
  $id = $_POST['id'];

if ($username == $user_admin) {
  $sql = 'UPDATE jean_w11_blog_posts SET title = ?, category = ?, content = ? where id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sssi', $title, $category, $content, $id);
  $result = $stmt->execute();
  if (!$result) {
    echo $conn->error;
    die();
  }
  header('Location: index.php');
} else {
  header('Location: add_post.php?errCode=2');
  die();
  };

?>
