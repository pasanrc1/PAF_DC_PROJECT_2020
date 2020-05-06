package com;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class HospitalAPI
 */
@WebServlet("/HospitalAPI")
public class HospitalAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Hospital hospital = new Hospital();   
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HospitalAPI() {
        super();
        Hospital hospital = new Hospital();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());

		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String returnMessage = hospital.insertHospital(request.getParameter("hospitalID"),
				 request.getParameter("hospitalName"),
				request.getParameter("hospitalAddress"),
				request.getParameter("contNum"),
				request.getParameter("hospitalCharges") );
		
		
		
		
		response.getWriter().write(returnMessage); 
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		Map paras = getParasMap(request);
		//paras.get("hidItemIDSave").toString()
		
		String output = hospital.updateHospital(paras.get("hidItemIDSave").toString(),
		paras.get("hospitalName").toString(),
		paras.get("hospitalAddress").toString(),
		paras.get("contNum").toString(),
		paras.get("hospitalCharges").toString());
		
		response.getWriter().write(output); 
		
		
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		Map paras = getParasMap(request);
		 String output = hospital.deleteHospital( request.getParameter("ID"));
		 System.out.println("ID = " + request.getParameter("ID"));
		response.getWriter().write(output); 
		
		
		
	}
	
	
	
	
	private static Map getParasMap(HttpServletRequest request)
	{
		Map<String, String> map = new HashMap<String, String>();
		try
		{
				Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
				String queryString = scanner.hasNext() ?
				scanner.useDelimiter("\\A").next() : "";
				scanner.close();
				String[] params = queryString.split("&");
				for (String param : params)
				{ 
					String[] p = param.split("=");
					map.put(p[0], p[1]);
				}
	 }
		
		catch (Exception e)
		 {
			System.out.println(e);
		 }
		return map;
		}

	
	
	 }
	


