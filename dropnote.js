$(document).ready(function(){
	initDropNoteApi();
});

function initDropNoteApi(){
	//you
	initUser();
	changeThisNote();
	getUserIPLocation();
	newNoteDrop();
	//note form
	initNoteForm();
	//admin
	getAllUsers();
	changeThisUser();
}
/**********
YOU
**********/
function initUser(){
	$(".profilePic").css("background-image","url(../images/db/"+user.profilePic);
	$(".userId").text(user.id);
	$(".username").text(user.name);
	$(".description").text(user.description);
	$(".permission").text(user.uploadPermission);
	//get your notes
	getAllYourNotes(user.id);
}

function getAllYourNotes(userId){
	var action="getAllYourNotes";
	
	$.get("dropnote_functions.php?action="+action+"&userId="+userId).done(function(d){
		var obj = JSON.parse(d);
		var list="";
		for(i=0;i<obj.length;i++){
			list+="<option value="+obj[i].id+">"+obj[i].note_title+"</option>";
		}
		var count;
		if(obj.length==1){
			count=obj.length+" note";
		}else{
			count=obj.length+" notes";
		}
		$(".allYourNoteCount").text(count);
		$(".allYourNotesList").html(list);
		getThisNote(obj[0].id);
	});
}

function getThisNote(noteId){
	var action="getThisNote";
	$.get("dropnote_functions.php?action="+action+"&noteId="+noteId+"&userId="+user.id).done(function(d){
		var obj = JSON.parse(d);
		$("#editNoteForm .noteTitle").val(obj[0].note_title);
		$("#editNoteForm .noteBody").val(obj[0].note_body);
		getThisNotesDrops(noteId);
	});
}

function getThisNotesDrops(noteId){
	var action="getThisNotesDrops";
	$.get("dropnote_functions.php?action="+action+"&noteId="+noteId+"&userId="+user.id).done(function(d){
		var obj = JSON.parse(d);
		var list="";
		for(i=0;i<obj.length;i++){
			list+="<option value="+obj[i].id+">"+obj[i].date_dropped+"</option>";
		}
		var count;
		if(obj.length==1){
			count=obj.length+" time";
		}else{
			count=obj.length+" times";
		}
		$(".thisNoteDropCount").text(count);
		$(".thisNotesDropList").html(list);
		$("#newNoteDropBtn").val(noteId);
		//getThisNote(obj[0].id);
	});
}

function changeThisNote(){
	$('.allYourNotesList').on('change', function() {
		var noteId=$(this).val();
		getThisNote(noteId);
	});
}

function newNoteDrop(){
	$("#newNoteDropBtn").click(function(){
		var action="newNoteDrop";
		var noteId=$(this).val();
		$.get("dropnote_functions.php?action="+action+"&noteId="+noteId+"&userId="+user.id+"&userLat="+userLat+"&userLng="+userLng).done(function(d){
			
		});
		
	});
}

/**********
MAPS
**********/
var userLat;
var userLng;
function getUserIPLocation(){
	$.get("http://ipinfo.io", function(d){
			userLat=d.loc.split(",")[0];
			userLng=d.loc.split(",")[1];
			myLocationMapInit();
			$(".userLat").text(userLat);
			$(".userLng").text(userLng);
		}, "jsonp");
}
function myLocationMapInit() {
	var userLatLng = new google.maps.LatLng(userLat, userLng);
	var mapOptions = {
		center: userLatLng,
		zoom: 9.	,
		disableDefaultUI: true,
		//styles: mapStyle3
	}
	var map = new google.maps.Map(document.getElementById('myLocationMap'), mapOptions);
}


/**********
NOTE FORM
**********/
function initNoteForm(){
	//create
	$("#noteForm .createBtn").click(function(){
		//alert("hi");
		if(user.uploadPermission==1){
			var action="createNewNote";
			var noteTitle=$("#noteForm .noteTitle").val();
			if($("#noteForm .noteTitle").val().length==0){
				noteTitle="Untitled";
			}
			alert(noteTitle);
			var noteBody=$("#noteForm .noteBody").val();
			if(noteBody.length==0){
				return;
			}
			
			var fd = new FormData();
			fd.append("action",action);
			//fd.append("titles",JSON.stringify({"titles":titles}));
			fd.append("userId",user.id);
			fd.append("noteTitle",noteTitle);
			fd.append("noteBody",noteBody);
			
			$.ajax({
				url:"dropnote_functions.php",
				type: "POST",
				data:fd,
				cache: false,
				contentType: false,
				processData: false,
				success: function(d){
					getAllYourNotes(user.id);
					$("#noteForm")[0].reset();
				}
			});
		}
	});
//edit
	$("#noteForm .editBtn").click(function(){
		
	});
//delete
	$("#noteForm .deleteBtn").click(function(){
		
	});
//cancel
	$("#noteForm .cancelBtn").click(function(){
		
	});
}

/**********
ADMIN
**********/
function getAllUsers(){
	var action="getAllUsers";
	
	$.get("dropnote_functions.php?action="+action).done(function(d){
		var obj = JSON.parse(d);
		var list="";
		for(i=0;i<obj.length;i++){
			list+="<option value="+obj[i].id+">"+obj[i].username+"</option>";
		}
		//all users
		$(".totalUsers").text(obj.length);
		$("#allUserList").html(list);
		//info for first user
		getThisUser(obj[0].id);
		getAllThisUserNotes(obj[0].id);
	});
}

function getThisUser(userId){
	var action="getThisUser"
	
	$.get("dropnote_functions.php?action="+action+"&id="+userId).done(function(d){
		var obj = JSON.parse(d);
		$(".thisUserId").text(userId);
		$(".thisUserName").text(obj[0].username);
		$(".thisUserPic").text(obj[0].profile_pic);
		$(".thisUserDescription").text(obj[0].description);
		$(".thisUserPermission").text(obj[0].permissions);
	});
}

function changeThisUser(){
	$('#allUserList').on('change', function() {
		var userId=$(this).val();
		getThisUser(userId);
	});
}

function getAllThisUserNotes(userId){
	var action="getAllThisUserNotes";
	
	$.get("dropnote_functions.php?action="+action+"&id="+userId).done(function(d){
		var obj = JSON.parse(d);
		var list="";
		var unlockCount=0;
		for(i=0;i<obj.length;i++){
			list+="<option value="+obj[i].id+">"+obj[i].title+"</option>";
			unlockCount+=obj[i].unlock_count;
		}
		//all users
		$(".thisUserTotalNoteCount").text(obj.length);
		$(".thisUserMyNoteTotalUnlockCount").text(unlockCount);
		$("#allThisUserNotes").html(list);
	});
}