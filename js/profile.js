$(document).ready(function(){
	//hides all the div on load
	$("#loader").hide();
	$("#error").hide();
	$("#userDetails").hide();
	$(".userBasicInfo").hide();
	$("#goBack").hide();
	//facebook token to be changed
	var userToken = 'EAACEdEose0cBANaVwxtnsqcHcG0TKSmyZCZByVNbZBWxkcw1qZBeQ3ir2DLnVYgATu0EqwjmdseRQTy1rtEWIGZB9ZBlEU8oFevTJUoXAZBpp9kMbTmmmaILDGMCJlK3DBHhAlBGVn749ZCmDRZAmeZByBlsgml3rdLrt2ZAYWGEjCGloqZBmtrptpQE7gWqcQvTlf7W2OjvYchBRwZDZD';
	//function to get and display the news feed
	var getUserBasicDetails = function(){
		$("#getUserDetails").hide();
		$.ajax({
			type: "GET",
			//URL
			url: "https://graph.facebook.com/me?fields=name,about,address,birthday,age_range,email,education,work,hometown,relationship_status,gender&access_token="+userToken,
			success: function(response){
				//display user details and back button. Hide all other buttons
				$("#getUserDetails").hide();
				$("#error").hide();
				$("#userDetails").show();
				$(".userBasicInfo").show();
				$("#name").html(response.name);
				$("#email").html(response.email);
				$("#birthday").html(response.birthday);
				$("#homeTown").html(response.hometown.name);
				$("#work").html(response.work[0].employer.name);
				$("#role").html(response.work[0].position.name);
				$("#school").html(response.education[0].school.name);
				$("#college").html(response.education[1].school.name);
				$("#collegeDept").html(response.education[1].concentration[0].name);
				$("#gender").html(response.gender);
				$("#goBack").show();
			},
			//on error or timeout call this function
			error: function(request,errorType,errorMsg){
				$("#error").show();
				$("#error").html("Its an" + " " + errorType + "." + " " + "Try again");
				$("#getUserDetails").show();
			},
			//set connection timeout
			timeout: 3000,
			//before getting the data from API
			beforeSend: function(){
				$("#loader").show();
			},
			//After getting the data from API
			complete: function(){
				$("#loader").hide();
			}
		});
	}
	//Go back to home page function
	var goBackToHome = function(){
		$("#loader").hide();
		$("#error").hide();
		$("#userDetails").hide();
		$(".userBasicInfo").hide();
		$("#goBack").hide();
		$("#getUserDetails").show();
	}
	//function to call the user details function to get and display the data from API
	$("#getUserDetails").on("click",getUserBasicDetails);
	//function to call the Go Back function to go back to home page
	$("#goBack").on("click",goBackToHome);
});