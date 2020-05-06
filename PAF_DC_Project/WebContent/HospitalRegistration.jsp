<%@ page import="com.Hospital" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script src="Components/Hospital.js"></script>

<title> Hospital Operations </title>
</head>
<body>



<h1> Hospital Operations </h1>


<div class="container">

	<form id="form1" name="form1">
	
		<div class="form-group">
      		<label for="hospitalID"> Hospital ID :</label>
      		<input type="number" class="form-control" id="hospitalID" placeholder="Enter Hospital ID " name="hospitalID">
    	</div>
    	
    	<div class="form-group">
      		<label for="hospitalName"> Hospital Name :</label>
      		<input type="text" class="form-control" id="hospitalName" placeholder="Enter Hospital Name" name="hospitalName">
    	</div>
    	
    	<div class="form-group">
      		<label for="hospitalAddress"> Hospital Address :</label>
      		<input type="text" class="form-control" id="hospitalAddress" placeholder="Enter Hospital Address" name="hospitalAddress">
    	</div>
    	
    	<div class="form-group">
      		<label for="contNum"> Contact No. :</label>
      		<input type="number" class="form-control" id="contNum" placeholder="Enter Contact Number" name="contNum" >
    	</div>
    	
    	<div class="form-group">
      		<label for="hospitalCharges"> Hospital Charges :</label>
      		<input type="number" class="form-control" id="hospitalCharges" placeholder="Enter email" name="hospitalCharges">
    	</div>
    	
    	
		
		<br>
		<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
 		<input type="hidden" id="hidItemIDSave" name="hidItemIDSave" value="">
		</form>
</div>

<div class="container">
	<div id="alertSuccess" class="alert alert-success"></div>
	<div id="alertError" class="alert alert-danger"></div>
</div>
	<br />
	
<div class="container">
	<div id="divItemsGrid">
 			<%	
 				Hospital hospital = new Hospital();
 				out.print( hospital.getHospitals() );
 				
 				
 			%>
</div>
</div>


</body>
</html>