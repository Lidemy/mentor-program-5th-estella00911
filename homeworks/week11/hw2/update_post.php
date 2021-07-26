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

  if (!empty($_GET['id'])) {
    $id = $_GET['id'];
  }

  $sql = "SELECT * FROM jean_w11_blog_posts where id = ?";
  $stmt = $conn->prepare($sql);
  $result = $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  $result = $stmt->get_result();

  $row = $result->fetch_assoc();  
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
    href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Berkshire+Swash&family=Caveat:wght@700&family=Gloria+Hallelujah&family=Gochi+Hand&family=Knewave&family=Lemonada:wght@600&family=Merriweather:ital@1&family=Noto+Sans+TC&family=Noto+Serif+TC&family=Permanent+Marker&family=Special+Elite&family=Noto+Sans&display=swap"
    rel="stylesheet">
  <!-- <script src="../../../node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js"></script> -->
  <script src="https://cdn.ckeditor.com/ckeditor5/29.0.0/classic/ckeditor.js"></script>
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
        <?php if ($username) { ?>
        <li class='navbar__blog-control navbar__style'><a href='logout.php'><img class='icon__nav-style'
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

    <section class='newPost_board font-Noto-Sans'>
      <!-- article__post-->
      <h2 class='font-Merri newPost__site-name'>Add a New Blog Post</h2>
      <form method='POST' action='handle__update_post.php' class='newPost__newPost-form'>
        <input type='text' class='newPost__add-title' name='title' placeholder='Title' value="<?php echo escape($row['title']); ?>"></input>
        <!-- for add new category -->
        <!-- <div class='newPost__category'> -->
          <select name="category" class='newPost__select-option'>
              <option selected disabled class='options'>Category</option>
            　<option value="旅遊日記" <?php if ($row['category'] == '旅遊日記') echo "selected"; ?>>旅遊日記</option>
            　<option value="生活札記" <?php if ($row['category'] == '生活札記') echo "selected"; ?>>生活札記</option>
            　<option value="美食饗宴" <?php if ($row['category'] == '美食饗宴') echo "selected"; ?>>美食饗宴</option>
          </select>
          <!-- <p class='newPost__btn-category'><img class="newPost__icon-style" src="./resources/icons_func/plus.svg"> -->
        <!-- </div> -->
        <textarea name="content" id="editor" class='ckeditor5' value='?'><?php echo $row['content']; ?></textarea>
        <?php 
          if (!empty($_GET['errCode'])) {
            $code = $_GET['errCode'];
            $msg = 'Error!!';
            if ($code == '1') {
              $msg = 'Please input missing fields';
            } else if ($code == '2') {
              $msg = "Sorry, you don't have permission to edit this post";  
            }
            echo '<p class="error">' . $msg . '</p>';
          }

        ?>
        <input type="hidden" name="id" value="<?php echo $row['id'] ?>" />
        <p class='newPost__btn-submit'><img class="newPost__icon-style" src="./resources/icons_func/plus.svg">
          <input type="submit" value="New Post" class='font-Merri newPost__btn-submit-text'>
        </p>
        </div>
      </form>
    </section>
  </main>
  <footer>
    <div class='footer__text'>
      <div>Copyright © 2021 Jean's Blog All Rights Reserved.</div>
      <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel
          perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  </footer>
  <script>
    // require( '@ckeditor/ckeditor5-build-classic' );
    ClassicEditor
      .create(document.querySelector('#editor'))
      .then(editor => {
        console.log(editor);
      })
      .catch(error => {
        console.error(error);
      });

    // default value of category:
    document.querySelector
  </script>
</body>

</html>