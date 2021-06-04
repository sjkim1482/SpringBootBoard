package com.nsetec.board.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nsetec.board.dao.BoardDao;
import com.nsetec.board.dao.BoardDaoI;
import com.nsetec.board.model.BoardVO;
import com.nsetec.board.model.CommentsVO;
import com.nsetec.board.model.FileVO;
import com.nsetec.board.model.PageVo;
import com.nsetec.board.model.PostVO;
import com.nsetec.board.model.UserVO;

@Service
public class BoardService implements BoardServiceI {

private static final Logger logger = LoggerFactory.getLogger(BoardService.class);
	
	@Resource(name = "boardDao")
	private BoardDao boardDao;

	//로그인
	@Override
	public int checkLogin(UserVO userVo) {
		// TODO Auto-generated method stub
		return boardDao.checkLogin(userVo);
	}

	//게시판 생성
	@Override
	public int insertBoard(BoardVO boardVo) {
		// TODO Auto-generated method stub
		return boardDao.insertBoard(boardVo);
	}

	//게시판 전체목록조회
	@Override
	public List<BoardVO> selectBoardList() {
		// TODO Auto-generated method stub
		return boardDao.selectBoardList();
	}

	@Override
	public List<UserVO> selectUserList() {
		// TODO Auto-generated method stub
		return boardDao.selectUserList();
	}

	@Override
	public int insertPost(PostVO postVo) {
		// TODO Auto-generated method stub
		return boardDao.insertPost(postVo);
	}

	@Override
	public UserVO selectUser(String user_id) {
		// TODO Auto-generated method stub
		return boardDao.selectUser(user_id);
	}

	//게시글 전체조회
	@Override
	public Map<String, Object> selectPostList(PageVo pageVo) {
		// TODO Auto-generated method stub
		Map<String, Object> map = new HashMap<>();
		int postListCnt = boardDao.postListCnt(pageVo);
		logger.debug("****************************************************");
		logger.debug("****************************************************");
		logger.debug("****************************************************");
		logger.debug("****************************************************");
		logger.debug("postListCnt : {}" ,postListCnt);
		
		map.put("postList", boardDao.selectPostList(pageVo));
		map.put("postListCnt", postListCnt);
		map.put("pagination", (int)Math.ceil( (double)postListCnt / pageVo.getPageSize()));
		map.put("pageVo", pageVo);
		
		int pagination = (int)Math.ceil((double)postListCnt/pageVo.getPageSize());
		
		int page = pageVo.getPage();
		int startPage = 1;
		int endPage = pagination;
		if((page-2)>2) {
			if(page==pagination||page==pagination-1||page==pagination-3) {
				startPage = pagination-4;
			}else{
				startPage = page-2;
			}
			if(startPage+4<pagination) {
				endPage = startPage+4;
			}
		}
		logger.debug("startPage : {}",startPage);
		if((page+2)<pagination-1) {
			if(page==1) {
				endPage = page+4;
			}else if(page == 2) {
				endPage = page+3;
			}else if(page == 4){
				endPage = page+1;
			}else {
				endPage = page+2;
			}
			if(endPage-4>page) {
				startPage = endPage-4;
			}
		}
		map.put("startPage", startPage);
		map.put("endPage", endPage);
		
		
		
		return map;
	}
	
	//게시글 상세조회
	@Override
	public PostVO postView(int post_no) {
		// TODO Auto-generated method stub
		boardDao.viewsPlus(post_no);
		return boardDao.postView(post_no);
	}

	@Override
	public int insertReply(PostVO postVo) {
		// TODO Auto-generated method stub
		return boardDao.insertReply(postVo);
	}

	@Override
	public int registUser(UserVO userVo) {
		// TODO Auto-generated method stub
		return boardDao.registUser(userVo);
	}

	@Override
	public int checkUserId(String user_id) {
		// TODO Auto-generated method stub
		return boardDao.checkUserId(user_id);
	}

	@Override
	public int insertFile(FileVO fileVo) {
		// TODO Auto-generated method stub
		return boardDao.insertFile(fileVo);
	}

	@Override
	public int maxPostno() {
		// TODO Auto-generated method stub
		return boardDao.maxPostno();
	}

	@Override
	public int deletePost(int post_no) {
		// TODO Auto-generated method stub
		return boardDao.deletePost(post_no);
	}

	@Override
	public int updatePost(PostVO postVO) {
		// TODO Auto-generated method stub
		return boardDao.updatePost(postVO);
	}

	@Override
	public int insertComment(CommentsVO commentsVO) {
		// TODO Auto-generated method stub
		return boardDao.insertComment(commentsVO);
	}

	@Override
	public List<CommentsVO> selectCommentsList(int post_no) {
		// TODO Auto-generated method stub
		return boardDao.selectCommentsList(post_no);
	}

	@Override
	public int deleteComments(int com_no) {
		// TODO Auto-generated method stub
		return boardDao.deleteComments(com_no);
	}

	@Override
	public List<PostVO> searchPostList(PageVo pageVo) {
		// TODO Auto-generated method stub
		return boardDao.searchPostList(pageVo);
	}

	@Override
	public List<BoardVO> boardListView() {
		// TODO Auto-generated method stub
		return boardDao.boardListView();
	}

	@Override
	public int updateBoard(BoardVO boardVo) {
		// TODO Auto-generated method stub
		return boardDao.updateBoard(boardVo);
	}

	@Override
	public List<FileVO> selectFileList(int post_no) {
		// TODO Auto-generated method stub
		return boardDao.selectFileList(post_no);
	}

	@Override
	public FileVO selectFile(int file_no) {
		// TODO Auto-generated method stub
		return boardDao.selectFile(file_no);
	}

	@Override
	public int deleteFile(int file_no) {
		// TODO Auto-generated method stub
		return boardDao.deleteFile(file_no);
	}
	
}
