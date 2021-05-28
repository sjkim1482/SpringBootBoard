package com.nsetec.board.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nsetec.board.service.BoardService;

@Controller
@RequestMapping("board")
public class JspController {

	private static final Logger logger = LoggerFactory.getLogger(JspController.class);
	
	@Autowired
	private BoardService boardService;
	
	
	//게시판 조회
	@RequestMapping("selectBoardList")
	public String selectBoardList(Model model) {
		System.out.println("게시판 전체목록 진입");
		logger.debug("================================");
		logger.debug("게시판 전체목록조회 컨트롤러 접속");
		logger.debug("boardList : {}", boardService.selectBoardList());
		logger.debug("================================");
		model.addAttribute("boardList", boardService.selectBoardList());
		System.out.println(model.getAttribute("boardList"));
		return "userListJson";
	}
		
		
}
