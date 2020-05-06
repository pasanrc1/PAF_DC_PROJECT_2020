// On loading




$(document).ready(function()
{
	if ($("#alertSuccess").text().trim() == "")
		{
			$("#alertSuccess").hide();
		}
	$("#alertError").hide();
	
	
	
	$(document).on("click", ".btnUpdate", function(event)
			{
			 
				
				$("#hidItemIDSave").val($(this).closest("tr").find('#hidItemIDUpdate').val());
				$("#hospitalID").val($(this).closest("tr").find('#hidItemIDUpdate').val());
				$("#hospitalName").val($(this).closest("tr").find('td:eq(1)').text());
				$("#hospitalAddress").val($(this).closest("tr").find('td:eq(2)').text());
				$("#contNum").val($(this).closest("tr").find('td:eq(3)').text());				
				$("#hospitalCharges").val($(this).closest("tr").find('td:eq(4)').text()); 

			});
	
	
	
	

	
// Save Button
$("#btnSave").click(function() {
	
	
	
	var status = ValidateForm();
	
	if( status != true ){
		$("#alertError").text(status);
		$("#alertError").show();
		 return;
	}
	$("#alertError").hide();
	
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
	$.ajax(
			{
			 url : "HospitalAPI",
			 type : type,
			 data : $("#form1").serialize(),
			 dataType : "text",
			 complete : function(response, status)
			 {
				 onSaveComplete(response.responseText, status);
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


function onSaveComplete(response, status)
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



