// On loading
/*
$(document).ready(function()
{
	if ($("#alertSuccess").text().trim() == "")
		{
			$("#alertSuccess").hide();
		}
	$("#alertError").hide();
}); 


var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";

$.ajax(
		{
		 url : "HospitalAPI",
		 type : type,
		 data : $("#form1").serialize(),
		 dataType : "text",
		 complete : function(response, status)
		 {
			 onItemSaveComplete(response.responseText, status);
		 }
		}
	);


function onItemSaveComplete(response, status)
{
 
	var resultSet = JSON.parse(response);
	if (resultSet.status.trim() == "success") 
	{
		$("#alertSuccess").text("Successfully saved.");
		$("#alertSuccess").show();
		$("#divItemsGrid").html(resultSet.data);
	} 
	else if (resultSet.status.trim() == "error")
	{
		$("#alertError").text(resultSet.data);
		$("#alertError").show();
	}

	else if (status == "error")
	{
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	}
	else
	{
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}

	$("#hidItemIDSave").val("");
	$("#form1")[0].reset();

}
// Save button ( Completed )

$(document).on("click", "#btnSave", function(event)
	{
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
		
	// Clear alerts---------------------
	 $("#alertSuccess").text("");
	 $("#alertSuccess").hide();
	 $("#alertError").text("");
	 $("#alertError").hide();
	 
	 var status = ValidateForm();
	 
	 if (status != true)
	 {
		 $("#alertError").text(status);
		 $("#alertError").show();
		 
		 return;
	 }
	 
	 $("#form1").submit();
	 
	 

	 $.ajax(
	 		{
	 		 url : "HospitalAPI",
	 		 type : type,
	 		 data : $("#form1").serialize(),
	 		 dataType : "text",
	 		 complete : function(response, status)
	 		 {
	 		 onItemSaveComplete(response.responseText, status);
	 		 }
	 		}
	 	);
	 

	
	});



// complete method to Validate

function ValidateForm(){
	
	// ID
	if ($("#hospitalID").val().trim() == "")
	 {
		return "Insert a ID for Hospital.";
	 }
	// HOS NAME
	if ($("#hospitalName").val().trim() == "" || $.isNumeric( $("#hospitalName").val().trim() ) )
	 {
		return "Insert Name of Hospital.";
	 }
	// HOS ADDRESS-------------------------------
	if ($("#hospitalAddress").val().trim() == "")
	 {
		return "Insert Hospital Address.";
	 }
	//HOS CONT NUM
	if( $("#contNum").val().trim() == ""){
		return "Insert Contact Number";
		
	}
	//Charges
	if( $("#hospitalCharges").val().trim() == ""){
		return "Insert hospital charges";
	}
	
	
	// is numerical value
	var hosId = $("#hospitalID").val().trim();
	
	if (!$.isNumeric(hosId))
	 {
		return "Insert a numer for ID";
	 }
	
	var contNum = $("#contNum").val().trim();
	
	if( !$.isNumeric(contNum) ){
		return "only insert number as contact number";
	}
	// convert to decimal price
	
	var hospitalCharges = $("#hospitalCharges").val().trim();
	if( !$.isNumeric(hospitalCharges) ){
		return "Inser only a price for charges";
	}
	
	return true;
	


	
}



// Complete update method

$(document).on("click", ".btnUpdate", function(event)
		{
		 
			
			$("#hidItemIDSave").val($(this).closest("tr").find('#hidItemIDUpdate').val());
			$("#hospitalID").val($(this).closest("tr").find('#hidItemIDUpdate').val());
			$("#hospitalName").val($(this).closest("tr").find('#hName').text());
			$("#hospitalAddress").val($(this).closest("tr").find('#addr').text());
			$("#contNum").val($(this).closest("tr").find('#cNo').text());
			$("#hospitalCharges").val($(this).closest("tr").find('#hCharge').text()); 

		});










$(document).on("click", ".btnRemove", function(event)
		{
		 $.ajax(
		 {
		 url : "HospitalAPI",
		 type : "DELETE",
		 dataType : "text",
		 complete : function(response, status)
		 {
		 onItemDeleteComplete(response.responseText, status);
		 }
		 });
		});




function onItemDeleteComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		}
		else if (resultSet.status.trim() == "error")
			{
				$("#alertError").text(resultSet.data);
				$("#alertError").show();
			}
		} 
		else if (status == "error")
		{
			$("#alertError").text("Error while deleting.");
			$("#alertError").show();
		} 
		else
		{
			$("#alertError").text("Unknown error while deleting..");
			$("#alertError").show();
		}
}

*/





$(document).ready(function()
{
	if ($("#alertSuccess").text().trim() == "")
		{
			$("#alertSuccess").hide();
		}
	$("#alertError").hide();
	

	
// Save Button
$("#btnSave").click(function() {
	
	
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";

	$.ajax(
			{
			 url : "HospitalAPI",
			 type : type,
			 data : $("#form1").serialize(),
			 dataType : "text",
			 complete : function(response, status)
			 {
				 onItemSaveComplete(response.responseText, status);
				 
			 }
			}
		);
		
	
	})
	


// Delete button

$(".btnRemove").click(function() {
	// Get hos id of the record to be deleted.
	var hostpitalID = $(this).attr('data-itemid');
	
	
	$.ajax({
		url: "HospitalAPI"+ '?' + $.param({"ID": hostpitalID}),
		type: "DELETE",
		dataType: "text",
		complete:function(response, status){
			onDeletecomplete(response.responseText, status);
			
		}
	})
	
})


  }); 






	

//After deletion
function onDeletecomplete(response, status){
	
		if (status == "success")
		{
			var resultSet = JSON.parse(response);
			
			if (resultSet.status.trim() == "success")
			{
				$("#alertSuccess").text("Successfully deleted.");
				$("#alertSuccess").show();
				$("#divItemsGrid").html(resultSet.data);
			}
			else if (resultSet.status.trim() == "error")
				{
					$("#alertError").text(resultSet.data);
					$("#alertError").show();
				}
			} 
			else if (status == "error")
			{
				$("#alertError").text("Error while deleting.");
				$("#alertError").show();
			} 
			else
			{
				$("#alertError").text("Unknown error while deleting..");
				$("#alertError").show();
			}
}


function onItemSaveComplete(response, status)
{
 
	var resultSet = JSON.parse(response);
	if (resultSet.status.trim() == "success") 
	{
		$("#alertSuccess").text("Successfully saved.");
		$("#alertSuccess").show();
		$("#divItemsGrid").html(resultSet.data);
	} 
	else if (resultSet.status.trim() == "error")
	{
		$("#alertError").text(resultSet.data);
		$("#alertError").show();
	}

	else if (status == "error")
	{
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	}
	else
	{
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}

	$("#hidItemIDSave").val("");
	$("#form1")[0].reset();

}







