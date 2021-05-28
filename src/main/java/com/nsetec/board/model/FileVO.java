package com.nsetec.board.model;

public class FileVO {

	private int file_no   ;
	private String file_nm   ;
	private String file_route;
	private int del_code  ;
	private int post_no   ;
	
	public int getFile_no() {
		return file_no;
	}
	public void setFile_no(int file_no) {
		this.file_no = file_no;
	}
	public String getFile_nm() {
		return file_nm;
	}
	public void setFile_nm(String file_nm) {
		this.file_nm = file_nm;
	}
	public String getFile_route() {
		return file_route;
	}
	public void setFile_route(String file_route) {
		this.file_route = file_route;
	}
	public int getDel_code() {
		return del_code;
	}
	public void setDel_code(int del_code) {
		this.del_code = del_code;
	}
	public int getPost_no() {
		return post_no;
	}
	public void setPost_no(int post_no) {
		this.post_no = post_no;
	}
	@Override
	public String toString() {
		return "FileVO [file_no=" + file_no + ", file_nm=" + file_nm + ", file_route=" + file_route + ", del_code="
				+ del_code + ", post_no=" + post_no + "]";
	}
}
