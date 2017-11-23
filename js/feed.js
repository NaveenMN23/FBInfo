$(document).ready(function(){
	//hides all the div on load
	$("#loader").hide();
	$("#error").hide();
	$("#userDetails").hide();
	$(".userBasicInfo").hide();
	$("#goBack").hide();
	//facebook token to be changed
	var facebookToken = "EAACEdEose0cBANaVwxtnsqcHcG0TKSmyZCZByVNbZBWxkcw1qZBeQ3ir2DLnVYgATu0EqwjmdseRQTy1rtEWIGZB9ZBlEU8oFevTJUoXAZBpp9kMbTmmmaILDGMCJlK3DBHhAlBGVn749ZCmDRZAmeZByBlsgml3rdLrt2ZAYWGEjCGloqZBmtrptpQE7gWqcQvTlf7W2OjvYchBRwZDZD";
	//function to get and display the news feed
	var newsFeed = function(event){
		event.preventDefault();
		$("#getUserDetails").hide();
		$.ajax({
			type:"GET",
			//URL
			url:"https://graph.facebook.com/me?fields=feed&access_token="+facebookToken,
			success: function(response){
				//display feed and back button. Hide all other buttons
				$("#getUserDetails").hide();
				$("#error").hide();
				$("#userDetails").show();
				$("#goBack").show();
				//News feed length
				var i = response.feed.data.length;
				//Loop feed in reverse order
				while(i--){
					//create dynamic div
					var divSubmit = $(document.createElement('div'));
					//check if feed is empty or not
					if(response.feed.data[i].story != '' && response.feed.data[i].story != undefined){
						//Append the data
                    	$(divSubmit).append('<label class="feeddatadisplaybold" id="div'+ i + '"">' + response.feed.data[i].story + '</label>');
		        	}		        	
		        	if(response.feed.data[i].message != '' && response.feed.data[i].message != undefined){
                    	$(divSubmit).append('<span class="feeddatadisplay"> says ' + response.feed.data[i].message + '</span>');
		        	}
		        	if(response.feed.data[i].created_time != '' && response.feed.data[i].created_time != undefined){
                    	$(divSubmit).append('<span class="feeddatadisplay"> on ' + response.feed.data[i].created_time + '</span>');
		        	}
		        	//append the dynamically created div after the existing userDetails div
		        	$('#userDetails').after(divSubmit);
				}
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
				//show loader
				$("#loader").show();
			},
			//After getting the data from API
			complete: function(){
				//hide loader
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
		$(".feeddatadisplaybold").hide();
		$(".feeddatadisplay").hide();
		$("#getUserDetails").show();
	}
	//function to call the news feed function to get and display the data from API
	$("#getUserDetails").on("click",newsFeed);
	//function to call the Go Back function to go back to home page
	$("#goBack").on("click",goBackToHome);
});