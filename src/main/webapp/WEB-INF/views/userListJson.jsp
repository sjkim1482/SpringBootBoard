<%@page import="com.nsetec.board.model.BoardVO"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

    <%
		List<BoardVO> boardList = (List<BoardVO>)request.getAttribute("boardList");
	%>
	
	{
		"children" :[
			
		<%
			if(boardList!=null){
				for(int i = 0; i<boardList.size(); i++ ){
					BoardVO vo = boardList.get(i);
					if(i>0){
						out.print(',');
					}
					
		
		%>
			{
				"text" : "<%=vo.getBoard_nm() %>",
				"leaf" : true,
				"id" : "<%=vo.getBoard_no() %>"
			}		
		<%
				}
						
			}
		%>
			
	
	
		]
	
	}
	