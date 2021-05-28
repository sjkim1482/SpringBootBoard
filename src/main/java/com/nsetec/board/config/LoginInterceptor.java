//package com.nsetec.board.config;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.web.servlet.HandlerInterceptor;
//import org.springframework.web.servlet.ModelAndView;
//
//public class LoginInterceptor implements HandlerInterceptor {
//	
//
//	@Override
//	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
//			throws Exception {
//		if(request.getSession().getAttribute("S_USER")==null) {
//			response.sendRedirect("/fail");
//			return false;
//		}
//		return true;
//	}
//	
//}
