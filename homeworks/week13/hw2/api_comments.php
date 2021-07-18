<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
	header('Access-Control-Allow-Origin: *');
  if(
  	empty($_GET['site_key'])
  ) {
  	$json = array (
  		"ok" => false,
  		"message" => 'please send site_key in URL'
  	);
  	$response = json_encode($json);
  	echo $response;
  	die();
  };

  $site_key = $_GET['site_key'];

  
  if (!empty($_GET['before'])) {
    $sql = "SELECT id, nickname, content, created_at FROM jean_w12_apiBoard_comment " . 
    "WHERE site_key = ? AND id < ? " . 
    "ORDER BY id DESC limit 5";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $site_key, $_GET['before']);
  } else { // URL query string: before
    $sql = "SELECT id, nickname, content, created_at FROM jean_w12_apiBoard_comment " . 
    "WHERE site_key = ? " . 
    "ORDER BY id DESC limit 5";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $site_key);
  };

  $result = $stmt->execute();
  if (!$result) {
  	$json = array (
  		"ok" => false,
  		"message" => $conn->error
  	);
  	$response = json_encode($json);
  	echo $response;
  	die();
  }
  $result = $stmt->get_result();
  $comments = array();
  while($row = $result->fetch_assoc()) {
  	array_push($comments, array(
      'id' => $row['id'],
  		'nickname'=> $row['nickname'],
  		'content' => $row['content'],
  		'created_at' => $row['created_at']
  	));
  };

	$json = array (
		"ok" => true,
		"comments" => $comments
	);

	$response = json_encode(	$json);
	echo $response;
?>