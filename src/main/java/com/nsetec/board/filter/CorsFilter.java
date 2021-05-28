package com.nsetec.board.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;

@WebFilter(urlPatterns = "/*")
public class CorsFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        
    	System.out.println("필터접근!");
    	HttpServletResponse response = (HttpServletResponse) servletResponse;
//    	response.setHeader("X-Frame-Options","DENY" );

    	response.setHeader("X-Frame-Options","SAMEORIGIN" );

//    	response.setHeader("X-Frame-Options","Allow-From https://some.othersite.com" );



    	
//        response.setHeader("X-Frame-Options", "ALLOW-FROM http://localhost/");
        
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
