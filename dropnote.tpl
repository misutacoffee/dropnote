<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<title>dropnote api</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link href='https://fonts.googleapis.com/css?family=Poppins:300,600' rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css" href="../css/globalStyle1.css">
<link rel="stylesheet" type="text/css" href="dropnote.css">
</head>

<body>
<section>
    <h4>DROPNOTE API</h4>
    {if $userId==7}
        <p>sign in?</p>
        <form id="signIn" class="formStyle1" method="post">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password">
            <input type="submit" value="submit" name="cmdlogin">
        </form>
    {else}
    	<p>log out?</p>
        <form class="formStyle1" action="../login/logout.php">
        	<input type="submit" value="logout">
        </form>
    {/if}
</section>
<section class="you">
    <h5>YOU</h5>
    <div class="profilePic"></div>
    <h6>user id:</h6>
    <p class="userId"></p>
    <h6>username:</h6>
    <p class="username"></p>
    <h6>description:</h6>
    <p class="description"></p>
    <h6>permission:</h6>
    <p class="permission"></p>
    <div id="myLocationMap"></div>
    <p><span class="userLat"></span>, <span class="userLng"></span></p>
    <p>geolocation</p>
    <p>ON or OFF</p>
    <div id="adminInit" class="admin">
        <h5>ADMIN</h5>
        <p>y or n</p>
        <p>pick user</p>
    </div>
</section>
<section class="you">
    <h5>YOUR NOTES</h5>
	<h6>you have <span class="allYourNoteCount"></span></h6>
    <select class="allYourNotesList"></select>
    <form id="editNoteForm" class="formStyle1" value="">
    	<input class="noteTitle" type="text" name="title" placeholder="title">
        <textarea class="noteBody" name="body" placeholder="body"></textarea>
        <input class="updateBtn" type="button" name="submitEditNote" value="Update">
        <input class="disableBtn" type="button" name="submitDeleteNote" value="Disable">
        <input class="cancelBtn" type="button" name="submitCancelNote" value="Cancel">
        <input class="deleteBtn" type="button" name="submitCancelNote" value="Delete">
    </form>
    <h5>DROPS</h5>
	<h6>this note has been dropped <span class="thisNoteDropCount"></span></h6>
	<h6>this note has been picked up <span class="thisNoteUnlockCount"></span></h6>
    <select class="thisNotesDropList"></select>
    <h5>CREATE A NEW DROP</h5>
	<button id="newNoteDropBtn">New Drop</button>
</section>
<section class="you">
    <h5>CREATE A NEW NOTE</h5>
    <form id="noteForm" class="formStyle1" value="">
    	<input class="noteTitle" type="text" name="title" placeholder="title">
        <textarea class="noteBody" name="body" placeholder="body"></textarea>
        <input class="createBtn" type="button" name="submitCreateNote" value="Create">
        <input class="cancelBtn" type="button" name="submitCancelNote" value="Cancel">
    </form>
</section>
<section>
	<h5>USER</h5>
    <h6>total users:</h6>
    <p><span class="totalUsers"></span> total users</p>
    <form id="pickThisUser">
    	<h6>search:</h6>
        <input type="search">
        <input type="button" value="search">
        <h6>select:</h6>
        <select id="allUserList"></select>
    </form>
    <div>
        <p>userId: <span class="thisUserId"></span></p>
        <p>username: <span class="thisUserName"></span></p>
        <p>profilepic: <span class="thisUserPic"></span></p>
        <p>description: <span class="thisUserDescription"></span></p>
        <p>permission: <span class="thisUserPermission"></span></p>
        <div class="admin">
            <p>user select</p>
        </div>
    </div>
</section>
<section>
	<h5><span class="thisUserName"></span>'S (CURRENT) NOTES</h5>
	<p><span class="thisUserTotalNoteCount"></span> total notes</p>
    <p><span class="thisUserMyNoteTotalUnlockCount"></span> total unlocks (by other users)</p>
    <select id="allThisUserNotes"></select>
    <div>view/edit/delete</div>
</section>
<section>
	<h5>NEW NOTE</h5>
    <p>title</p>
    <p>body</p>
    <p>save/cancel</p>
</section>
<section>
	<h5>FOUND NOTES</h5>
    <p>filter</p>
    <p>list of notes (with found location)</p>
</section>
<section>
	<h5>FIND NEW NOTES</h5>
    <p>map</p>
    <p>find button</p>
    
</section>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBrBdXyqgLykQj9ppSBAGzQCSaSwzC94ZM"></script>
<script>
var user = {
    get id() { return "{$userId}"; },
    get name() { return "{$username}"; },
    get profilePic() { return "{$profilePic}"; },
    get description() { return "{$description}"; },
    get cookieId() { return "{$cookieId}"; },
    get uploadPermission() { return "{$uploadPermission}"; },
    get adminPermission() { return "{$adminPermission}"; },
    get settings() { return "{$settings}"; }
};
var thisPage = "{$thisPage}";
</script>
<script src="dropnote.js"></script>
</html>
