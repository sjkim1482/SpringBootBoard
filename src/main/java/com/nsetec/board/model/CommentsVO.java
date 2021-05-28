package com.nsetec.board.model;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class CommentsVO {

	private int com_no;
	private String com_cont;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date reg_dt;
	private int del_code;
	private int post_no;
	private String user_id;
	public int getCom_no() {
		return com_no;
	}
	public void setCom_no(int com_no) {
		this.com_no = com_no;
	}
	public String getCom_cont() {
		return com_cont;
	}
	public void setCom_cont(String com_cont) {
		this.com_cont = com_cont;
	}
	public Date getReg_dt() {
		return reg_dt;
	}
	public void setReg_dt(Date reg_dt) {
		this.reg_dt = reg_dt;
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
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	@Override
	public String toString() {
		return "CommentsVO [com_no=" + com_no + ", com_cont=" + com_cont + ", reg_dt=" + reg_dt + ", del_code="
				+ del_code + ", post_no=" + post_no + ", user_id=" + user_id + "]";
	}

	
	
}
