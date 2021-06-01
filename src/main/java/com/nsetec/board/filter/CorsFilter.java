//package com.nsetec.board.filter;
//
//import java.io.IOException;
//
//import javax.servlet.Filter;
//import javax.servlet.FilterChain;
//import javax.servlet.FilterConfig;
//import javax.servlet.ServletException;
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//import javax.servlet.annotation.WebFilter;
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration.WebMvcAutoConfigurationAdapter;
//
//@WebFilter(urlPatterns = "/*")
//public class CorsFilter implements Filter {
//    @Override
//    public void init(FilterConfig filterConfig) throws ServletException {
//
//    }
//
//   
//    
//    @Override
//    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
//    	
////    	http.headers().frameOptions().disable()
//    	System.out.println("필터접근!");
//    	HttpServletResponse response = (HttpServletResponse)servletResponse;
////        response.setHeader("X-Frame-Options", "ALLOW-FROM http://192.168.40.139/");
//        response.setHeader("X-Frame-Options", "SAMEORIGIN");
//        filterChain.doFilter(servletRequest, servletResponse);
//    	
//    	
////    	System.out.println("필터접근!");
////    	HttpServletResponse response = (HttpServletResponse) servletResponse;
//////    	response.setHeader("X-Frame-Options","DENY" );
////
////    	response.setHeader("X-Frame-Options","SAMEORIGIN" );
////
//////    	response.setHeader("X-Frame-Options","Allow-From https://some.othersite.com" );
////
////
////
////    	
//////        response.setHeader("X-Frame-Options", "ALLOW-FROM http://localhost/");
////        
////        filterChain.doFilter(servletRequest, servletResponse);
//    }
//
//    @Override
//    public void destroy() {
//
//    }
//}
