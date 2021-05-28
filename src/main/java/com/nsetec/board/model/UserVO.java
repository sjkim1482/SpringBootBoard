package com.nsetec.board.model;

public class UserVO {

	private String user_id;
	private String pass;
	private String user_name;
	private int age;
	private String gender;
	private int admin_code;
	
	
	public int getAdmin_code() {
		return admin_code;
	}
	public void setAdmin_code(int admin_code) {
		this.admin_code = admin_code;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	@Override
	public String toString() {
		return "UserVO [user_id=" + user_id + ", pass=" + pass + ", user_name=" + user_name + ", age=" + age
				+ ", gender=" + gender + ", admin_code=" + admin_code + "]";
	}
	
	
	

}
