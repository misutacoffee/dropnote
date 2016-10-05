<?php
//muletail
date_default_timezone_set('Asia/Tokyo');
$date = date("Y.m.d");
$time = time();
$imgSrc="../images/db/";

/**********
QUERY HANDLING FUNCTIONS (json encode,etc.)
**********/
function select_query_to_json($sql){//SELECT QUERIES
	include ("../components/dbConnect.php");
	$array = array();
	if ($result = $conn->query($sql)) {
		$tempArray = array();
		while($row = $result->fetch_object()) {
		  $tempArray = $row;
		  array_push($array, $tempArray);
		}
	  echo json_encode($array);	
	};
	mysqli_close($conn);
}

function append_table($sql){//INSERT, UPDATE, DELETE QUERIES
	include ("../components/dbConnect.php");
	if (!mysqli_query($conn, $sql)) {
		$response = "Error: " . $sql . "<br>" . mysqli_error($conn);
	}else{$response = "success!";}
	echo json_encode($response);
	mysqli_close($conn);
}

/**********
ADMIN
**********/
/**********
TABLE
user

id
username
profile_pic
description
link_url
link_name
email
password
actcode
disabled
activated
settings
permissions
cookie_id
facebook_id
twitter_id
google_id
**********/
if($_GET["action"]==="getAllUsers"){
	$sql="SELECT id, username FROM user WHERE activated = 1 ORDER BY id DESC";
	select_query_to_json($sql);
}
if($_GET["action"]==="getThisUser"){
	$id=$_GET["id"];
	$sql="SELECT username, profile_pic, description, permissions FROM user WHERE id = $id";
	select_query_to_json($sql);
}
//get notes
if($_GET["action"]==="getAllThisUserNotes"){
	$id=$_GET["id"];
	$sql="SELECT id, note_title, unlock_count FROM dropnote_notes WHERE user_id = $id";
	select_query_to_json($sql);
}
/**********
DROPNOTE DATABASE

TABLE
dropnote_notes

id
user_id
note_title
note_body
disabled
unlock_count
date_created

TABLE
dropnote_drops

id
user_id
note_id
lat
lng
date_dropped
disabled

TABLE
dropnote_unlocked

id
user_id
drop_id
date_unlocked
**********/
if($_GET["action"]==="getAllYourNotes"){
	$userId=$_GET["userId"];
	$sql="SELECT id, note_title FROM dropnote_notes WHERE user_id = $userId AND disabled=0 ORDER BY id DESC";
	select_query_to_json($sql);
}

if($_GET["action"]==="getThisNote"){
	$noteId=$_GET["noteId"];
	$userId=$_GET["userId"];
	$sql="SELECT id, note_title, note_body, date_created FROM dropnote_notes WHERE id=$noteId AND user_id = $userId ORDER BY id DESC";
	select_query_to_json($sql);
}

if($_GET["action"]==="getThisNotesDrops"){
	$noteId=$_GET["noteId"];
	$userId=$_GET["userId"];
	$sql="SELECT id, date_dropped FROM dropnote_drops WHERE user_id = $userId AND note_id = $noteId";
	select_query_to_json($sql);
}

if($_POST["action"]==="createNewNote"){
	$userId = $_POST["userId"];
	$noteTitle = $_POST["noteTitle"];
	$noteBody = $_POST["noteBody"];
	$sql = "INSERT INTO dropnote_notes (user_id, note_title, note_body, date_created) VALUES ($userId,'$noteTitle','$noteBody', '$date')";
	append_table($sql);
}

if($_GET["action"]==="newNoteDrop"){
	$userId=$_GET["userId"];
	$noteId=$_GET["noteId"];
	$userLat=$_GET["userLat"];
	$userLng=$_GET["userLng"];
	$sql = "INSERT INTO dropnote_drops (user_id, note_id, lat, lng, date_dropped) VALUES ($userId, $noteId, '$userLat', '$userLng', '$date')";
	append_table($sql);

}

?>