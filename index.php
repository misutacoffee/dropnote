<?php include("../login/loginCheck.php");
//dropnote/index.php
require '../components/smarty/Smarty.class.php';
$smarty = new Smarty;

$smarty->caching = true;
$smarty->cache_lifetime = 120;

$smarty->assign("userId", "$userId", true);
$smarty->assign("username", "$username", true);
$smarty->assign("profilePic", "$profilePic", true);
$smarty->assign("description", "$description", true);
$smarty->assign("cookieId", "$cookieId", true);
$smarty->assign("cookieValue", "$cookieValue", true);
$smarty->assign("uploadPermission", "$uploadPermission", true);
$smarty->assign("adminPermission", "$adminPermission", true);
$smarty->assign("settings", "$settings", true);
$smarty->assign("thisPage", "$thisPage", true);

//API login verification
if (isset($_POST['login'])){
	$password=$_POST["password"];
	if($password=="muletail"){
		$_SESSION["loggedIn"]=1;
		$smarty->display('dropnote.tpl');
	}else{
		$_SESSION["loggedIn"]=0;
		$smarty->display('dropnote_login.tpl');
	}
}elseif($_SESSION["loggedIn"]==1){
	$smarty->display('dropnote.tpl');
}else{
	$smarty->display('dropnote_login.tpl');
};

//logged in:
//$smarty->display('dropnote.tpl');

//NOT logged in:
//$smarty->display('dropnote_login.tpl');
?>