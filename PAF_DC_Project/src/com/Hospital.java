package com;

import java.sql.Connection;
import java.sql.DriverManager;

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
		
		
		return returnString;
	}

}
