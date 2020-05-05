package com;

import java.sql.*;





public class Hospital {
	
	Connection conn = null;
	
	public Hospital() {
	
		String url = "jdbc:mysql://localhost:3306/pafhospitalmanagementdb2020?autoReconnect=true&useSSL=false";
		String userName = "root";
		String password = "";
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
			
			conn = DriverManager.getConnection(url, userName, password);
			System.out.println("DB Connected..");
		}
		catch(Exception e) {
			System.out.println(e);
			System.out.println("Faild DB..");
		}
	}
	
	
	
	
	public String getHospitals() {
		
		String returnString = "";
		
		if ( conn == null)
		{
			return "Can not connect with database";
		} 
		
		returnString = "<table border='1'> " +
						" <tr> <th> Hospital ID </th> " +
						" <th> Hospital Name </th> " +
						" <th> Address </th> " +
						" <th> Contact Num </th> " +
						" <th> Charges </th> " +
						" <th> Update </th> " +
						" <th> Remove </th> </tr>";
		
		
		String QUERY = "SELECT * FROM Hospitals"; 
		
		try {
			Statement st = conn.createStatement();
			ResultSet rs = st.executeQuery(QUERY);
			
			while( rs.next() ) {
				
				String hospitalID = Integer.toString( rs.getInt(1) );	
				String hospitalName = rs.getString(2);
				String address = rs.getString(3);
				String contNum = Integer.toString( rs.getInt(4) );
				String hosCharges = Double.toString( rs.getDouble(5) );
				
				//Adding a line
				
				returnString += " <tr> " +
								" <td> <input id='hidItemIDUpdate' name='hidItemIDUpdate' type='hidden' value='" + hospitalID + "'/> </td> " +
								" <td> " + hospitalName + " </td> " +
								" <td> " + address + " </td> " +
								" <td> " + contNum + " </td> " +
								" <td> " + hosCharges + " </td> " ;
				
				
				
				// Adding update and remove buttons
				returnString += "<td> <input name='btnUpdate' type='button' value='Update' class='btnUpdate btn btn-secondary'> </td>" +
								"<td><input name='btnRemove' type='button' value='Remove' class='btnRemove btn btn-danger' data-itemid='" + hospitalID + "'/>" + "</td> </tr>";
			}
			conn.close();
			returnString += "</table>";
			
		}
		catch(Exception e) {
			
			returnString = "Error occured while reading DB";
			System.err.println(e.getMessage());
		}
		
		
		return returnString;
	}
	
	
	public String insertHospital(String hosId, String hosName, String address, String contNum, String hosCharges) {
		String returnString = "";
		
		if ( conn == null)
		{
			return "Can not connect with database";
		} 
		
		String QUERY = "INSERT INTO Hospitals VALUES ( ? , ? , ? , ? , ? )";
		
		try {
			PreparedStatement preparedStmt = conn.prepareStatement(QUERY);
			
			preparedStmt.setInt(1, Integer.parseInt(hosId) );
			preparedStmt.setString(2, hosName);
			preparedStmt.setString(3, address);
			preparedStmt.setInt(4, Integer.parseInt(contNum));
			preparedStmt.setDouble(5, Double.parseDouble(hosCharges) );
			
			preparedStmt.execute();
			conn.close();
			
			String hospitals = getHospitals();
			returnString = "{\"status\":\"success\", \"data\": \"" +
			 hospitals + "\"}";
			
			
			
		}
		catch(Exception e) {
			returnString = "{\"status\":\"error\", \"data\": + \"Error while inserting the item.\"}";
			System.err.println(e.getMessage());
		}
		return returnString;
	}
	
	
	public String updateHospital(String hosId, String hosName, String address, String contNum, String hosCharges) {
		String returnString = "";
		
		if ( conn == null)
		{
			return "Can not connect with database";
		} 
		
		
		String QUERY = "UPDATE Hospitals SET hosName = ?, address = ?, contNum = ?, hosCharges = ? where  hostId = ?";
		
		try {
			PreparedStatement st = conn.prepareStatement(QUERY);
			
			st.setInt(1,  Integer.parseInt(hosId));
			st.setString(2, hosName);
			st.setString(3, address);
			st.setInt(4, Integer.parseInt(contNum));
			st.setDouble(5,  Double.parseDouble(hosCharges));
			
			st.executeUpdate();
			conn.close();
			
			
			String hospitals = getHospitals();
			returnString = "{\"status\":\"success\", \"data\": \"" +
					hospitals + "\"}"; 
			
			
		}
		catch(Exception e) {
			returnString = "{\"status\":\"error\", \"data\":\"Error while updating the item.\"}";
			System.err.println(e.getMessage()); 
		}
		return returnString;
	}
	
	
	
	public String deleteHospital(String hosId) {
		String returnString = "";
		
		if ( conn == null)
		{
			return "Can not connect with database";
		} 
		
		
		String QUERY = "DELETE FROM Hospitals WHERE hostId =?";
		
		try {
			PreparedStatement st = conn.prepareStatement(QUERY);
			st.setInt(1,  Integer.parseInt(hosId));
			st.executeUpdate();
			conn.close();
			
			String details = getHospitals();
			returnString = "{\"status\":\"success\", \"data\": \"" +
					details + "\"}"; 
			
		
		}
		catch(Exception e) {
			returnString = "{\"status\":\"error\", \"data\":\"Error while deleting the item.\"}";
			System.err.println(e.getMessage()); 
		}
		
		return returnString;
	}
	

}
