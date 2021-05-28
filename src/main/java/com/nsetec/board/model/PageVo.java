package com.nsetec.board.model;

public class PageVo {
	private int page;
	private int pageSize;
	private int board_no;
	
	
	
	public int getPage() {
		return page == 0 ? 1:page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getPageSize() {
		return pageSize == 0 ? 5 : pageSize;
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
	@Override
	public String toString() {
		return "PageVo [page=" + page + ", pageSize=" + pageSize + ", board_no=" + board_no + "]";
	}

	
}
