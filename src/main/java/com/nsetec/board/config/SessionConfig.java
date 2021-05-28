//package com.nsetec.board.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class SessionConfig implements WebMvcConfigurer {
//	
//	@Override
//	public void addInterceptors(InterceptorRegistry registry) {
//		System.out.println("인터셉터 접근");
//		registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/**");
//	}
//}
