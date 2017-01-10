<?php
    header('Content-Type: text/html; charset=utf-8');
	$db = new mysqli('localhost', 'root', '1', 'member');

	if($db->connect_errno){
         die("ERROR : -> ".$DBcon->connect_error);
    }

	$db->set_charset('utf8');
?>