package com.nsetec.board.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="board")
public class BoardVO {
	@Id
	private int board_no;
	private String board_nm;
	private int check_on;
	
	public int getBoard_no() {
		return board_no;
	}
	public void setBoard_no(int board_no) {
		this.board_no = board_no;
	}
	public String getBoard_nm() {
		return board_nm;
	}
	public void setBoard_nm(String board_nm) {
		this.board_nm = board_nm;
	}
	public int getCheck_on() {
		return check_on;
	}
	public void setCheck_on(int check_on) {
		this.check_on = check_on;
	}
	@Override
	public String toString() {
		return "BoardVO [board_no=" + board_no + ", board_nm=" + board_nm + ", check_on=" + check_on + "]";
	}
	
}
