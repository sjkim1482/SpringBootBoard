package com.nsetec.board.model;

import java.util.Date;

public class PostVO {

	private int post_no;
	private String title;
	private String cont;
	private Date reg_dt;
	private int views;
	private int del_code;
	private int board_no;
	private String user_id;
	private int pre_post_no;
	private int rn;
	
	
	
	public int getRn() {
		return rn;
	}
	public void setRn(int rn) {
		this.rn = rn;
	}
	public int getPost_no() {
		return post_no;
	}
	public void setPost_no(int post_no) {
		this.post_no = post_no;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCont() {
		return cont;
	}
	public void setCont(String cont) {
		this.cont = cont;
	}
	public Date getReg_dt() {
		return reg_dt;
	}
	public void setReg_dt(Date reg_dt) {
		this.reg_dt = reg_dt;
	}
	public int getViews() {
		return views;
	}
	public void setViews(int views) {
		this.views = views;
	}
	public int getDel_code() {
		return del_code;
	}
	public void setDel_code(int del_code) {
		this.del_code = del_code;
	}
	public int getBoard_no() {
		return board_no;
	}
	public void setBoard_no(int board_no) {
		this.board_no = board_no;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public int getPre_post_no() {
		return pre_post_no;
	}
	public void setPre_post_no(int pre_post_no) {
		this.pre_post_no = pre_post_no;
	}
	@Override
	public String toString() {
		return "PostVO [post_no=" + post_no + ", title=" + title + ", cont=" + cont + ", reg_dt=" + reg_dt + ", views="
				+ views + ", del_code=" + del_code + ", board_no=" + board_no + ", user_id=" + user_id
				+ ", pre_post_no=" + pre_post_no + ", rn=" + rn + "]";
	}
	

}
