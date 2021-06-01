package com.nsetec.board.web;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.nsetec.board.model.BoardVO;
import com.nsetec.board.model.CommentsVO;
import com.nsetec.board.model.FileVO;
import com.nsetec.board.model.PageVo;
import com.nsetec.board.model.PostVO;
import com.nsetec.board.model.UserVO;
import com.nsetec.board.service.BoardService;
import com.nsetec.board.util.FileUtil;

@ServletComponentScan
@RestController
@RequestMapping("board")
public class BoardController {
	
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	
	//시큐리티 pw암호화
	@Autowired
	BCryptPasswordEncoder pwdEncode;
	//시큐리티
	@Bean
	public BCryptPasswordEncoder getPwdEncode() {
		return new BCryptPasswordEncoder();
	}
	//model=>json
//	@Bean
//	MappingJackson2JsonView jsonView() {
//		return new MappingJackson2JsonView();
//	}
	
	@Autowired
	private BoardService boardService;
	
	
	//로그인
	@PostMapping("checkLogin")
	public Map<String, Object> selectEmpList(UserVO userVo,HttpSession session, HttpServletRequest request, Model model) {
		
		UserVO dbUser = boardService.selectUser(userVo.getUser_id());
		boolean pwdMatch = false;
		if(dbUser != null) {
			pwdMatch = pwdEncode.matches(userVo.getPass(), dbUser.getPass());
		}
		System.out.println(pwdMatch);
		logger.debug("================================");
		logger.debug("로그인 컨트롤러 접속");
		logger.debug("userVo : {}", userVo );
		logger.debug("================================");
//		int check = boardService.checkLogin(userVo);
		Map<String, Object> map = new HashMap<String, Object>();
		int check = 0;
		if(dbUser != null && pwdMatch == true) {
			
			check = 1;
//			UserVO joinUserVo = boardService.selectUser(userVo.getUser_id());
			session.setAttribute("S_USER", dbUser);
			map.put("userVo", dbUser);
//			model.addAttribute("userVo", dbUser);
		}
//		model.addAttribute("check", check);
		map.put("check", check);
		return map;
	}
	
	//로그아웃
	@PostMapping("logout")
	public Map<String, Object> logout(HttpServletRequest request, HttpSession session){
		Map<String, Object> map = new HashMap<String, Object>();
		request.getSession().invalidate();
		
		Object obj = request.getSession().getAttribute("S_USER");
		
		if(obj == null) {
			map.put("logoutCheck", 1);
		}else {
			map.put("logoutCheck", 0);
		}
		
		return map;
		
	}
	
	
	
	//게시판 생성
	@PostMapping(path = "insertBoard")
	public Map<String, Object> insertBoard(BoardVO boardVo, Model model) {
		
		logger.debug("================================");
		logger.debug("게시판 생성 컨트롤러 접속");
		logger.debug("boardVo : {}", boardVo );
		logger.debug("================================");
		Map<String, Object> map = new HashMap<String, Object>();
		int insertCnt = boardService.insertBoard(boardVo);
		map.put("insertCnt", insertCnt);
//		model.addAttribute("insertCnt", insertCnt);
		
		return map;
	}
	
	//사용자 전체목록조회
	@PostMapping(path = "selectUserList")
	public Map<String, Object> selectUserList(Model model) {
		
		logger.debug("================================");
		logger.debug("게시판 전체목록조회 컨트롤러 접속");
		Map<String, Object> map = new HashMap<String, Object>();
		List<UserVO> userList = boardService.selectUserList();
		logger.debug("userList : {}", userList);
		logger.debug("================================");
		map.put("userList", userList);
		
		return map;
	}
	//MultipartHttpServletRequest fileList
	//게시글 등록
	@PostMapping(path = "insertPost")
	public synchronized Map<String, Object> insertPost(PostVO postVo,HttpSession session,MultipartFile uploadFile, HttpServletRequest request, Model model) {
		System.out.println("게시글 등록진입");
//		List<MultipartFile> files = fileList.getFiles("uploadFile");
//		System.out.println(uploadFile.getOriginalFilename());
		UserVO userVo = (UserVO)(request.getSession().getAttribute("S_USER"));
		postVo.setUser_id(userVo.getUser_id());
		logger.debug("================================");
		logger.debug("게시글 등록 컨트롤러 접속");
		logger.debug("postVo : {}", postVo);
		logger.debug("================================");
		Map<String, Object> map = new HashMap<String, Object>();
		int insertCnt = boardService.insertPost(postVo);
		map.put("insertCnt", insertCnt);
		model.addAttribute("insertCnt", insertCnt);
		
		
		String filename = "";
		//파일등록
		FileVO attFileVo = new FileVO();
		int max_post_no = boardService.maxPostno();
		map.put("max_post_no", max_post_no);
		attFileVo.setPost_no(max_post_no);
		if(insertCnt == 1) {
			if(uploadFile!=null) {
			
					if(!("".equals(uploadFile.getOriginalFilename()))) {
						try {
							String uploadPath = "d:" + File.separator + "uploadFile/";
							
							File uploadDir = new File(uploadPath);
							
							if(!uploadDir.exists()) {
								uploadDir.mkdirs();
							}
							String fileExtension = FileUtil.getFileExtension(uploadFile.getOriginalFilename());
							String realfilename = uploadPath + UUID.randomUUID().toString()+fileExtension;
							filename = uploadFile.getOriginalFilename();
							
							uploadFile.transferTo(new File(realfilename));
							
							attFileVo.setFile_nm(filename);
							attFileVo.setFile_route(realfilename);
							
							
							boardService.insertFile(attFileVo);
							
						} catch (IllegalStateException | IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				
			}
		}
		
		
		
		
		
		
		
		return map;
	}
	
	
	//게시글 전체조회
	@PostMapping(path = "selectPostList")
	public Map<String, Object> selectPostList(PageVo pageVo,String pageSizeStr, String searchCheckStr, String searchStr) {

		
		if("".equals(pageSizeStr)) {
			pageVo.setPageSize(10);
		}else {
			pageVo.setPageSize(Integer.parseInt(pageSizeStr));
		}
		
		if("".equals(searchCheckStr)) {
			pageVo.setSearchCheck(3);
		}else {
			pageVo.setSearchCheck(Integer.parseInt(searchCheckStr));
		}

		logger.debug("================================");
		logger.debug("게시글 조회 컨트롤러 접속");
		logger.debug("pageVo : {}", pageVo);
		logger.debug("postList : {}", boardService.selectPostList(pageVo));
		logger.debug("================================");
		
		
		return boardService.selectPostList(pageVo);
	}
	
	
	//게시글 상세조회 postView
	@PostMapping(path = "postView")
	public Map<String, Object> postView(int post_no,HttpServletRequest request,HttpSession session, Model model) {

		logger.debug("================================");
		logger.debug("게시글 상세조회 컨트롤러 접속");
		logger.debug("post_no : {}", post_no);
		logger.debug("================================");
		Map<String, Object> map = new HashMap<String, Object>();
		PostVO postVo = boardService.postView(post_no);
		map.put("post", postVo);
		List<CommentsVO> commentsList = boardService.selectCommentsList(post_no);
		map.put("commentsList", commentsList);
		String user_id = postVo.getUser_id();
		String s_user_id =  ((UserVO)request.getSession().getAttribute("S_USER")).getUser_id();
		map.put("s_user_id", s_user_id);
		
		if(user_id.equals(s_user_id)) {
			map.put("writerCheck", 1);
		}else {
			map.put("writerCheck", 0);
		}
		
		
		
		
//		model.addAttribute("post",postVo);
//			UserVO userVo = (UserVO)request.getSession().getAttribute("S_USER");
//			int writer = 0;
//			if(postVo.getUser_id().equals(userVo.getUser_id())) {
//				writer = 1;
//			}
//			model.addAttribute("writer",writer);
		
		return map;
	}
	
	//답글 등록
	@PostMapping(path = "insertReply")
	public Map<String, Object> insertReply(PostVO postVo,HttpSession session, HttpServletRequest request, Model model) {
		UserVO userVo = (UserVO)(request.getSession().getAttribute("S_USER"));
		postVo.setUser_id(userVo.getUser_id());
		logger.debug("================================");
		logger.debug("게시글 등록 컨트롤러 접속");
		logger.debug("postVo : {}", postVo);
		logger.debug("================================");
		Map<String, Object> map = new HashMap<String, Object>();
		int insertCnt = boardService.insertReply(postVo);
		map.put("insertCnt", insertCnt);
		int max_post_no = boardService.maxPostno();
		map.put("max_post_no", max_post_no);
//		model.addAttribute("insertCnt", insertCnt);
		
		return map;
	}
	
	//유저 등록
	@PostMapping(path = "registUser")
	public Map<String, Object> registUser(UserVO userVo, Model model) {
		
		logger.debug("================================");
		logger.debug("유저 등록 컨트롤러 접속");
		String inputPass = userVo.getPass();
		String pwd = pwdEncode.encode(inputPass);
		userVo.setPass(pwd);
		logger.debug("userVo : {}", userVo);
		logger.debug("================================");
		Map<String, Object> map = new HashMap<String, Object>();
		int insertCnt = boardService.registUser(userVo);
		map.put("insertCnt", insertCnt);
//		model.addAttribute("insertCnt", insertCnt);
		
		return map;
	}
	
	//아이디 중복검사
	@PostMapping(path = "checkUserId")
	public Map<String, Object> checkUserId(String user_id, Model model) {
		
		logger.debug("================================");
		logger.debug("아이디 중복검사 컨트롤러 접속");
		logger.debug("user_id : {}", user_id);
		logger.debug("================================");
		Map<String, Object> map = new HashMap<String, Object>();
		int check = boardService.checkUserId(user_id);
		map.put("check", check);
//		model.addAttribute("check", boardService.checkUserId(user_id));
		
		return map;
	}
	
	@PostMapping(path = "deletePost")
	public Map<String, Object> deletePost(int post_no){
		Map<String, Object> map = new HashMap<String, Object>();
		logger.debug("================================");
		logger.debug("게시글 삭제 컨트롤러 접속");
		logger.debug("post_no : {}", post_no);
		logger.debug("================================");
		int deleteCheck = boardService.deletePost(post_no);
		map.put("deleteCheck", deleteCheck);
		
		
		return map;
	}
	
	@GetMapping(path = "updatePost")
	public Map<String,Object> updatePost(int post_no){
		Map<String,Object> map = new HashMap<String, Object>();
		
		logger.debug("================================");
		logger.debug("게시글 수정(GET) 컨트롤러 접속");
		logger.debug("post_no : {}", post_no);
		logger.debug("================================");
		map.put("post", boardService.postView(post_no));
		
		
		return map;
	}
	
	@PostMapping(path = "updatePost")
	public Map<String,Object> updatePost(PostVO postVo,HttpSession session,MultipartFile uploadFile, HttpServletRequest request){
		Map<String,Object> map = new HashMap<String, Object>();
		
		logger.debug("================================");
		logger.debug("게시글 수정(POST) 컨트롤러 접속");
		logger.debug("postVo : {}", postVo);
		logger.debug("================================");
		map.put("updateCnt", boardService.updatePost(postVo));
		
		
		return map;
	}
	
	@PostMapping(path = "insertComment")
	public Map<String,Object> insertComment(CommentsVO commentsVO,HttpSession session, HttpServletRequest request){
		Map<String,Object> map = new HashMap<String, Object>();
		commentsVO.setUser_id(((UserVO)request.getSession().getAttribute("S_USER")).getUser_id());
		logger.debug("================================");
		logger.debug("댓글등록 컨트롤러 접속");
		logger.debug("commentsVO : {}", commentsVO);
		logger.debug("================================");
		map.put("insertCnt", boardService.insertComment(commentsVO));
		
		
		return map;
	}
	
	@PostMapping(path = "deleteComments")
	public Map<String,Object> deleteComment(int com_no){
		Map<String,Object> map = new HashMap<String, Object>();
		
		logger.debug("================================");
		logger.debug("댓글삭제 컨트롤러 접속");
		logger.debug("com_no : {}", com_no);
		logger.debug("================================");
		map.put("deleteCnt", boardService.deleteComments(com_no));
		
		
		return map;
	}
	
	@GetMapping(path = "searchPostList")
	public Map<String,Object> searchPostList(PageVo pageVo){
		Map<String,Object> map = new HashMap<String, Object>();
		
		logger.debug("================================");
		logger.debug("게시글 조건검색 컨트롤러 접속");
		logger.debug("pageVo : {}", pageVo);
		logger.debug("================================");
		map.put("postList", boardService.searchPostList(pageVo));
		
		
		return map;
	}
	
	
}
