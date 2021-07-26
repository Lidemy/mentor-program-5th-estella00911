<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Login</title>
  <link type="text/css" rel="stylesheet" href="style.css">
  <link rel='stylesheet' href='https://necolas.github.io/normalize.css/8.0.1/normalize.css'>
  </link>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital@1&display=swap" rel="stylesheet">
</head>
<body>
  <div class='login__body-bg'>
    <div class='login__board'>
      <div class='login__pannel'>
        <div class='input__style'>
          <div class='icon__user'></div>
        </div>
        <form action='handle__login.php' method='POST'>
          <div class='input__style'>
            <div class='login__icon-style-1 icon__username'></div>
            <input type='text' name='username' placeholder='username' class='login__input-type-text'></input>
          </div>
          <div class='input__style'>
            <div class='login__icon-style-1 icon__password'></div>
            <input type='password' name='password' placeholder='password' class='login__input-type-text'></input>
          </div>
          <?php
            if (!empty($_GET['errCode'])) {
              $code = $_GET['errCode'];
              $err = 'Err!!!';
              if ($code === '1') {
                $msg = 'Sign in Not Completed';
              } else if ($code === '2') {
                $msg = 'Incorrect Password or Username';
              } else if ($code === '3') {
                $msg = 'Could not find your username';
              }
              echo '<h2 class="error">' . $msg . '</h2>';
            }
          ?>
          <div class='input__style login__btn-submit-style'><img class='login__icon-style-2'
              src='./resources/icons_func/login.svg'><input type='submit' value='Login'
              class='login__btn-submit'></input>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>
    <div class='footer__text font-Merri'>
      <div>Copyright © 2021 Jean's Blog All Rights Reserved.</div>
      <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel
          perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  </footer>
</body>

</html>