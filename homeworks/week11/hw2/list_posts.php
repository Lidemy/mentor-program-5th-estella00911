<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();

  $username = NULL;
  $user_admin = NULL;

  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    if ($username === 'admin') {
      $user_admin = $username;
    }
  }

  $sql = "SELECT * FROM `jean_w11_blog_posts` WHERE is_deleted is NULL ORDER BY id DESC";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  if (!$result) {
    echo $conn->error;
    die();
  }
  
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Jean's Blog</title>
  <link type="text/css" rel="stylesheet" href="style.css">
  <link rel='stylesheet' href='https://necolas.github.io/normalize.css/8.0.1/normalize.css'>
  </link>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link
    href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Berkshire+Swash&family=Caveat:wght@700&family=Gloria+Hallelujah&family=Gochi+Hand&family=Knewave&family=Lemonada:wght@600&family=Merriweather:ital@1&family=Noto+Sans+TC&family=Noto+Serif+TC&family=Permanent+Marker&family=Special+Elite&display=swap"
    rel="stylesheet">
</head>

<body>
  <nav>
    <!-- <div class='wrapper'> -->
    <div class='navbar'>
      <ul>
        <li class='navbar__list navbar__style'><a href='./index.php'>Home</a></li>
        <li class='navbar__list navbar__style'><a href='./index.php'>Blog</a></li>
        <li class='navbar__list navbar__style'><a href='./list_posts.php'>Archives</a></li>
        <li class='navbar__list navbar__style'><a href='#'>Category</a></li>
        <li class='navbar__list navbar__style'><a href='#'>About</a></li>
      </ul>
      <ul>
        <li class='navbar__social-media navbar__style'>
          <a href="#"><div class='icon__nav-style icon__twitter'></div></a>
        </li>
        <li class='navbar__social-media navbar__style'>
          <a href="#"><div class='icon__nav-style icon__facebook'></div></a>
        </li>
        <li class='navbar__social-media navbar__style'>
          <a href="#"><div class='icon__nav-style icon__linkedin'></div></a>
        </li>
        <li class='navbar__social-media navbar__style'>
          <a href="https://github.com/estella00911"><div class='icon__nav-style icon__github'></div></a>
        <?php if(!$username) { ?>
          <li class='navbar__blog-control navbar__style'><a href='./login.php'><img class='icon__nav-style'
              src='./resources/icons_func/login.svg'>Login</a></li>
        <?php } ?>
        <?php if ($username) { ?>
        <li class='navbar__blog-control navbar__style'><a href='./logout.php'><img class='icon__nav-style'
              src='./resources/icons_func/logout.svg'>Logout</a></li>
        <?php } ?>
      </ul>
      <!-- </div> -->
    </div>
    <div class='navbar__admin'>
      <ul>
        <?php if ($username) { ?>
        <li class='navbar__blog-control navbar__style'><a href='./add_post.php'><img class='icon__nav-style'
              src='./resources/icons_func/plus.svg'>New Post</a></li>
        <?php } ?>
        <?php if ($user_admin) { ?> 
        <li class='navbar__blog-control navbar__style'><a href='./blog_admin.php'><img class='icon__nav-style'
              src='./resources/icons_func/user.svg'>Admin</a></li>
        <?php } ?>
      </ul>
    </div>
  </nav>
  <main>
    <section class='section__banner'>
      <div class='blog__site-area font-Abril'>
        <h1 class='blog__site-title'>Jean's Blog</h1>
        <p class='blog__site-intro font-Serif-TC'>There is only one thing that makes a dream impossible to achieve: the
          fear of failure.</p>
      </div>
    </section>
    <section class='section__posts wrapper font-Serif-TC'>
      <div class='article__lists'>
        <?php while($row = $result->fetch_assoc()) { ?>
        <div class='article__post' id='<?php echo escape($row['id']); ?>'>
          <div class='article__photo article__photo-admin'></div>
          <div class='article__body article__body-admin'>
            <div class='article__title article__title-admin'><?php echo escape($row['title']); ?></div>
            <div class='article__info article__date-admin'>
              <div class='icon__post-style icon__clock'></div>
              <div class='article__date font-Merri'><?php echo escape($row['created_at']); ?></div>
            </div>
            <div class='article__info article__catelog-admin'>
              <div class='icon__post-style icon__folder'></div>
              <div class='article__category'><?php echo escape($row['category']); ?></div>
            </div>
          </div>
          <?php if($user_admin) { ?>
          <div class='article__btn-position font-Merri'>
            <a class='article__btn-style' href='update_post.php?id=<?php echo $row['id'] ?>'>
              <div class='btn__edit'>
                <div class='icon__edit-style icon__edit'></div><span>Edit</span>
              </div>
            </a>
            <a class='article__btn-style' href='handle__delete_post.php?id=<?php echo $row['id'] ?>'>
              <div class='btn__delete'>
                <div class='icon__edit-style icon__delete'></div><span>Delete</span>
              </div>
            </a>
          </div>
          <?php } ?>
        </div>
        <!-- 分隔線 -->
        <div class='article__dividing-line'></div>
      <?php } ?>
        <!-- 新增文章，也要連 dividing line ＋ 文章本身，一起新增         
        <div class='article__dividing-line'></div>
        <div class='article__post'>
        </div> 
      -->

      </div>
    </section>
  </main>
  <footer>
    <div class='footer__text font-Merri'>
      <div>Copyright © 2021 Jean's Blog All Rights Reserved.</div>
      <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel
          perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  </footer>

  <script>
    let urlBase = 'https://mentor-program.co/mtr04group2/jean/week11/hw1';
    let article_post = document.querySelectorAll('.article__post');
    for (let i = 0; i < article_post.length; i++) {
      article_post[i].addEventListener('click', function(e){
      console.log(e.target);
      console.log(e.currentTarget.id);
      location.href = `${urlBase}/post_page.php?id=${e.currentTarget.id}`;
      });
    };
  </script>
</body>

</html>




<!-- <li class='navbar__admin'><a href='#'>Login</a></li> -->