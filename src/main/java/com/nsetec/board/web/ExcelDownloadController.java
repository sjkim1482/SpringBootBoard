package com.nsetec.board.web;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nsetec.board.model.UserVO;
import com.nsetec.board.service.BoardService;

import net.sf.jxls.exception.ParsePropertyException;
import net.sf.jxls.transformer.XLSTransformer;

@Controller
@RequestMapping("board")
public class ExcelDownloadController {
	
	@Autowired
	private BoardService boardService;
	
	@GetMapping("userListExcel")
	public void userListExcel(HttpServletRequest request, HttpServletResponse response, ModelMap modelMap)
			throws Exception, Exception {
		
		
		// 그냥 평소에 마이바티스에서 데이터 뽑는 방법으로 데이터를 가져온다.
		List<UserVO> userList = boardService.selectUserList();

		// 받은 데이터를 맵에 담는다.
		Map<String, Object> beans = new HashMap<String, Object>();
		beans.put("userList", userList);
		
		// 엑셀 다운로드 메소드가 담겨 있는 객체
		ExcelDownloadController me = new ExcelDownloadController();

		me.download(request, response, beans, "UserList", "userTemplate.xlsx", "");

	}
	
	
	//엑셀 다운로드
	public void download(HttpServletRequest request, HttpServletResponse response, Map<String, Object> bean,
			String fileName, String templateFile, String string) throws ParsePropertyException, InvalidFormatException {
		
		// 받아오는 매개변수 bean는 디비에서 뽑아온 데이터
        // fileName 은 다운로드 받을때 지정되는 파일명
        // templateFile 는 템플릿 엑셀 파일명이다.
        
        // tempPath는 템플릿 엑셀파일이 들어가는 경로를 넣어 준다.
		String tempPath = request.getSession().getServletContext().getRealPath("/WEB-INF/excel");

		// 별도로 다운로드 만들기 귀찮으까 이런식으로 만들어서 바로 엑셀 생성후 다운 받게 
		try {

			InputStream is = new BufferedInputStream(new FileInputStream(tempPath + "\\" + templateFile));
			XLSTransformer xls = new XLSTransformer();

			Workbook workbook = (Workbook) xls.transformXLS(is, bean);

			response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + ".xlsx\"");

			OutputStream os = response.getOutputStream();

			workbook.write(os);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	
}
