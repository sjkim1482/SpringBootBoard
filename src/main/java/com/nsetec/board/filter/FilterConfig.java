//package com.nsetec.board.filter;
//
//import java.util.Arrays;
//
//import javax.servlet.Filter;
//
//import org.springframework.boot.autoconfigure.web.servlet.WebMvcRegistrations;
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class FilterConfig implements WebMvcConfigurer, WebMvcRegistrations {
//
//	@Bean
//	public FilterRegistrationBean<CorsFilter> getFilterRegistrationBean()
//	{
////		FilterRegistrationBean registrationBean = new FilterRegistrationBean(new CorsFilter());
////		 registrationBean.addUrlPatterns("/*"); // 서블릿 등록 빈 처럼 패턴을 지정해 줄 수 있다.
////		return registrationBean;
//		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<CorsFilter>();
//		
//		bean.setFilter(new CorsFilter());
//		bean.setUrlPatterns(Arrays.asList("/*"));
//		
//		return bean;
//		
//	}
//	
//}
