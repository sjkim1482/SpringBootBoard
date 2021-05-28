package com.nsetec.board.config;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("board")
public class SessionCheck {
	
	@PostMapping("sessionCheck")
	public Map<String, Object> sessionCheck(HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		
		if (request.getSession().getAttribute("S_USER")!=null) {
			map.put("S_USER", request.getSession().getAttribute("S_USER"));
		}else {
			map.put("S_USER", null);
		}
		
		return map;
		
	}
	
}
