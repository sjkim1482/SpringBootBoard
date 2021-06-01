package com.nsetec.board.service;

import java.util.List;
import java.util.Map;

import com.nsetec.board.model.BoardVO;
import com.nsetec.board.model.CommentsVO;
import com.nsetec.board.model.FileVO;
import com.nsetec.board.model.PageVo;
import com.nsetec.board.model.PostVO;
import com.nsetec.board.model.UserVO;

public interface BoardServiceI {
	
	//로그인
	int checkLogin(UserVO userVo);
	//사용자 정보조회
	UserVO selectUser(String user_id);
	//게시판생성
	int insertBoard(BoardVO boardVo);
	//게시판 전체목록조회
	List<BoardVO> selectBoardList();
	//사용자 전체조회
	List<UserVO> selectUserList();
	//게시글 등록
	int insertPost(PostVO postVo);
	//게시글 전체조회
	Map<String, Object> selectPostList(PageVo pageVo);
	//게시글 상세조회
	PostVO postView(int post_no);
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
	//게시판 전체목록조회(관리자용)
	List<BoardVO> boardListView();
	//게시판 활성, 비활성
	int updateBoard(BoardVO boardVo);
	//첨부파일 전체조회
	List<FileVO> selectFileList(int post_no);
	//첨부파일 개별조회
	FileVO selectFile(int file_no);
	
}
