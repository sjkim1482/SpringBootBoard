package com.nsetec.board.dao;

import java.util.List;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.nsetec.board.model.BoardVO;
import com.nsetec.board.model.FileVO;
import com.nsetec.board.model.PageVo;
import com.nsetec.board.model.PostVO;
import com.nsetec.board.model.UserVO;

@Repository
public class BoardDao implements BoardDaoI {

	
	@Resource(name = "sqlSessionTemplate")
	private SqlSessionTemplate template;
	
	//로그인
	@Override
	public int checkLogin(UserVO userVo) {
		// TODO Auto-generated method stub
		return template.selectOne("board.checkLogin", userVo);
	}

	//게시판생성
	@Override
	public int insertBoard(BoardVO boardVo) {
		// TODO Auto-generated method stub
		return template.insert("board.insertBoard", boardVo);
	}

	//게시판 전체목록조회
	@Override
	public List<BoardVO> selectBoardList() {
		// TODO Auto-generated method stub
		return template.selectList("board.selectBoardList");
	}

	//사용자 전체조회
	@Override
	public List<UserVO> selectUserList() {
		// TODO Auto-generated method stub
		return template.selectList("board.selectUserList");
	}

	//게시글 등록
	@Override
	public int insertPost(PostVO postVo) {
		// TODO Auto-generated method stub
		return template.insert("board.insertPost",postVo);
	}
	
	//사용자 정보조회
	@Override
	public UserVO selectUser(String user_id) {
		// TODO Auto-generated method stub
		return template.selectOne("board.selectUser",user_id);
	}
	
	//게시글 전체조회
	@Override
	public List<PostVO> selectPostList(PageVo pageVo) {
		// TODO Auto-generated method stub
		return template.selectList("board.selectPostList",pageVo);
	}

	//게시글 전체수
	@Override
	public int postListCnt(PageVo pageVo) {
		// TODO Auto-generated method stub
		return template.selectOne("board.postListCnt",pageVo);
	}
	
	//게시글 상세조회
	@Override
	public PostVO postView(int post_no) {
		// TODO Auto-generated method stub
		return template.selectOne("board.postView", post_no);
	}

	@Override
	public int viewsPlus(int post_no) {
		// TODO Auto-generated method stub
		return template.update("board.viewsPlus", post_no);
	}

	@Override
	public int insertReply(PostVO postVo) {
		// TODO Auto-generated method stub
		return template.insert("board.insertReply", postVo);
	}

	@Override
	public int registUser(UserVO userVo) {
		// TODO Auto-generated method stub
		return template.insert("board.registUser",userVo);
	}

	@Override
	public int checkUserId(String user_id) {
		// TODO Auto-generated method stub
		return template.selectOne("board.checkUserId",user_id);
	}

	@Override
	public int insertFile(FileVO fileVo) {
		// TODO Auto-generated method stub
		return template.insert("board.insertFile",fileVo);
	}

	@Override
	public int maxPostno() {
		// TODO Auto-generated method stub
		return template.selectOne("board.maxPostno");
	}
	
	
}
