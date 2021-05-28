//package com.nsetec.board.web;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.multipart.commons.CommonsMultipartResolver;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class FileConfig implements WebMvcConfigurer{
//
//	@Bean
//	public CommonsMultipartResolver multipartResolver() {
//		CommonsMultipartResolver commonsMultipartResolver=
//				new CommonsMultipartResolver();
//		commonsMultipartResolver.setDefaultEncoding("UTF-8");
//		commonsMultipartResolver.setMaxUploadSizePerFile(5*1024*1024);
//		return commonsMultipartResolver;
//	}
//	
//}
