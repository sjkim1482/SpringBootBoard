package com.nsetec.board.util;

public class FileUtil {
	
	public static String getFileName(String contentDisposition) {
		String[] attrs = contentDisposition.split("; ");
		
		for(String attr : attrs) {
			if(attr.startsWith("filename=")) {
				//filename="brown.png"
				attr = attr.replace("filename=", "");
				
				//"brown.png"
				return attr.substring(1, attr.length() - 1);
				
				
			}
		}
		
		return "";
				
	}
	public static String getFileExtension(String filename) {
		//return filename.split("\\.")[1];
		//line.brown.png
		
		
		//brown
		if(filename.indexOf(".") == -1)
			return "";
		
		return "."+filename.substring(filename.lastIndexOf(".")+1);
	}

}
