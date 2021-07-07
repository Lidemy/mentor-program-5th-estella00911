<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_GET['id'])) {
    $json = array(
      "ok" => false,
      "message" => 'Please input id in URL'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $id = intval($_GET['id']);


  $sql = "SELECT id, todo FROM jean_w12_apiTodo_list where id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
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
  $row = $result->fetch_assoc();
  $json = array(
    "ok" => true,
    "data" => array(
      'id' => $row['id'],
      'todo' => $row['todo']
    )
    );
  
  $response = json_encode($json);
  echo $response;
?>