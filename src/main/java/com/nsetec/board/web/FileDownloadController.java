package com.nsetec.board.web;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nsetec.board.model.FileVO;
import com.nsetec.board.service.BoardService;

@Controller
@RequestMapping("board")
public class FileDownloadController {
	
	@Autowired
	private BoardService boardService;
	
	@GetMapping("fileDownload")
	public void fileDownload(int file_no, HttpServletResponse resp) throws IOException {
		FileVO attFileVo = boardService.selectFile(file_no);
		
		
		String fileName = attFileVo.getFile_nm();
		
		
		String path = attFileVo.getFile_route();
		
		resp.setHeader("Content-Disposition", "attachment; filename="+fileName);
		


		FileInputStream fis = new FileInputStream(path);
		ServletOutputStream sos = resp.getOutputStream();
		
		byte[] buff = new byte[512];
		while(fis.read(buff)!=-1) {
			
			sos.write(buff);
			
		}
		
		
		fis.close();
		sos.flush();
		sos.close();
	}
	
}
