<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
  
  $result = $conn->query("select * from jean_comments order by id desc");
  if (!$result) {
    die('Error:' . $conn->error);
  }

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Jean's Board</title>
  <link rel="stylesheet" href="style.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC&family=Roboto+Slab:wght@500&display=swap" rel="stylesheet">

</head>

<body>
  <div class='warning'>
    <strong><header>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header></strong>
  </div>
  <main>
    <div class='board__navbar'>
      <?php if (!$username) { ?> 
      <a class='board__btn' href="register.php">Register</a>
      <a class='board__btn' href="login.php">Login</a>
      <?php } else { ?>
      <a class='board__btn' href="logout.php">Logout</a>
      <?php } ?>
    </div>
  <div class='board'>
    <div class='wrapper'>
    <h1>Comment</h1>
    <?php if ($username) { ?>
    <form class='board__new-comment-form' method='POST' action='handle_add_comment.php'>
      
      <div>
        <div class='board__input-row'>
          <span class='bg-color'>Hello! <?php echo $username; ?></span>
        </div>
        <textarea name='content' rows='5' class='board__input board__input-textarea'></textarea>
        <?php
        if (!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          $err = 'Err!!!';
          if ($code === '1') {
            $msg = 'the information you entered is incompleted.';
          }
          echo '<h2 class="error">Error</h2>'; 
          echo '<h2 class="error">' . $msg . '</h2>';
        } ?>
        <input class='board__submit-btn' type='submit' value='Submit'></input>
      </div>
      <?php } else { ?>
        <h2 class='bg-color'>Please login to leave comment</h2>
      <?php } ?> 
      <div class='board__hr'></div>

    </form>
  </div>
    <section>
      <div class='wrapper'>
        <?php 
          while($row = $result->fetch_assoc()) {
        ?>
        <div class='card'>
          <div class='card__avatar'></div>
          <div class='card__body'>
            <span class='card__author'><?php echo $row['nickname']; ?></span>
            <span class='card__time'><?php echo $row['created_at']; ?></span>
            <p class='card__content'><?php echo $row['content']; ?></p>
          </div>
        </div>
      <?php } ?>
      </div>
    </section>
  </div>
  </main>
</body>
</html>