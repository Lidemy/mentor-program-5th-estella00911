<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Login</title>
  <link type="text/css" rel="stylesheet" href="style_login.css">
  <link rel='stylesheet' href='https://necolas.github.io/normalize.css/8.0.1/normalize.css'></link>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Merriweather:ital@1&display=swap" rel="stylesheet">
</head>


<body>
  <div class='body_bg'>
  <div class='board'>
    <div class='pannel'>
      <div class='input__style'>
        <div class='icon__user'></div>
      </div>
    <form action='handle__login.php' method='POST'>
      <div class='input__style'>
        <div class='icon__style icon__username'></div>
        <input type='text' name='username' placeholder='username' class='input__type-text'></input>
      </div>
      <div class='input__style'>
        <div class='icon__style icon__password'></div>
        <input type='password' name='passowrd' placeholder='password' class='input__type-text'></input>
      </div>
      <div class='input__style btn__submit-style'><img class='login__icon-style' src='./resources/icons_func/login.svg'><input type='submit' value='Login' class='btn-submit'></input></div>

      <!-- <div class='input__style'><input type='submit' value='Login' class='btn-submit'></input></div> -->
    </form>
  </div>
  </div>
</div>
  <footer>
    <div class='footer__text font-Merri'>
      <div>Copyright © 2021 Jean's Blog All Rights Reserved.</div>
      <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  </footer>
</body>

</html>