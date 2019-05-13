<?php

$conn = require('./mysql_connection');

//CREATE QUERY TO DB AND PUT RECEIVED DATA INTO ASSOCIATIVE ARRAY
if (isset($_REQUEST['query'])) {
	$query = $_REQUEST['query'];
	
	$sql = mysqli_query ($conn,"SELECT * FROM Users WHERE f_name LIKE '%{$query}%'");
	$array = array();
	
	while ($row = mysqli_fetch_assoc($sql)) {
		$array[] = $row['f_name'];
	}
	
	echo json_encode ($array); //Return the JSON Array
}

?>
