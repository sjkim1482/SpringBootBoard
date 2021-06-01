package com.nsetec.board.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nsetec.board.model.BoardVO;
import com.nsetec.board.model.CommentsVO;
import com.nsetec.board.model.FileVO;
import com.nsetec.board.model.PageVo;
import com.nsetec.board.model.PostVO;
import com.nsetec.board.model.UserVO;

public interface BoardDaoI{
	
	//로그인
	int checkLogin(UserVO userVo);
	//사용자 정보조회
	UserVO selectUser(String user_id);
	//게시판 생성
	int insertBoard(BoardVO boardVo);
	//게시판 전체목록조회
	List<BoardVO> selectBoardList();
	//사용자 전체조회
	List<UserVO> selectUserList();
	//게시글 등록
	int insertPost(PostVO postVo);
	//게시글 전체조회
	List<PostVO> selectPostList(PageVo pageVo);
	//게시글 전체개수
	int postListCnt(PageVo pageVo);
	//게시글 상세조회
	PostVO postView(int post_no);
	//게시글 조회수 증가
	int viewsPlus(int post_no);
	//답글 게시판 등록
	int insertReply(PostVO postVo);
	//유저등록
	int registUser(UserVO userVo);
	//아이디 중복확인
	int checkUserId(String user_id);
	//파일 등록
	int insertFile(FileVO fileVo);
	//최근 게시글 번호
	int maxPostno();
	//게시글 삭제
	int deletePost(int post_no);
	//게시글 수정
	int updatePost(PostVO postVO);
	//댓글 등록
	int insertComment(CommentsVO commentsVO);
	//댓글 조회
	List<CommentsVO> selectCommentsList(int post_no);
	//댓글 삭제
	int deleteComments(int com_no);
	//게시글 조검검색
	List<PostVO> searchPostList(PageVo pageVo);
	
}
