package com.nsetec.board.model;

public class PageVo {
	private int page;
	private int pageSize;
	private int board_no;
	private int searchCheck;
	private String searchStr;
	
	
	
	public int getPage() {
		return page == 0 ? 1:page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getPageSize() {
		return pageSize == 0 ? 10 : pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getBoard_no() {
		return board_no;
	}
	public void setBoard_no(int board_no) {
		this.board_no = board_no;
	}
	public int getSearchCheck() {
		return searchCheck;
	}
	public void setSearchCheck(int searchCheck) {
		this.searchCheck = searchCheck;
	}
	public String getSearchStr() {
		return searchStr;
	}
	public void setSearchStr(String searchStr) {
		this.searchStr = searchStr;
	}
	@Override
	public String toString() {
		return "PageVo [page=" + page + ", pageSize=" + pageSize + ", board_no=" + board_no + ", searchCheck="
				+ searchCheck + ", searchStr=" + searchStr + "]";
	}
	
	
}
