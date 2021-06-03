/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
flag = false;
Ext.define('ExtJSBoard.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',
    id : 'login',
    width : 500,
    height : 400,
    layout : 'center',
    closablc : false,
//    maximized : true,
    autoShow : true,
    onEsc : function(){
		return false
	},
	
	title : 'SimpleBoard',
    items : [{
		xtype : 'form',
		
		layout : {
			type : 'vbox',
			align : 'center',
			pack : 'center'
		
		},
		
		items : [{
			xtype : 'textfield',
			name : 'user_id',
			fieldLabel : '아이디',
			value : 'ksj0926'
		},{
			xtype : 'textfield',
			name : 'pass',
			inputType : 'password',
			fieldLabel : '비밀번호',
			value : '1234'
		},{
			xtype : 'button',
			width : 275,
			text : '로그인',
			handler : function(btn){  
				var user_id = btn.up('window').down("component[name=user_id]").value;
				var pass = btn.up('window').down("component[name=pass]").value;
				Ext.Ajax.request({
					url : '/board/checkLogin',
					method : 'POST',
					params : {
						user_id : user_id,
						pass : pass
					},
					success : function(response){
						login_flag = true;
						console.log(Ext.decode(response.responseText));
						var check = Ext.decode(response.responseText).check;
						var userVo = Ext.decode(response.responseText).userVo;
						console.log("check",check);
						if(check == 1 ){
							btn.up("window").close();
//							alert(userVo.admin_code);
							if(userVo.admin_code==1){
								admin_flag = 1;
								Ext.widget("adminMain");			
							}else{
								admin_flag = 0;
								Ext.widget("main");
							}
						}else{
							alert("아이디와 비밀번호가 일치하지 않습니다.");
						}
//						console.log("success", Ext.decode(response.responseText));
//						var store = obj.down("grid").getStore();
//						console.log("store", store);
//						// 데이터를 배열로 넣을 때
//						store.loadData(result.empList);
//						obj.down("panel").update(result.empCnt);
					},
					failure : function(response){
						console.log(response);
					}
				});
				
				
			}
		},{
			xtype : 'button',
			width : 275,
			text : '회원가입',
			handler : function(btn){
				Ext.create("Ext.window.Window",{
				width : 400,
				height : 400,
		//		minWidth : 250,
		//		minHeight : 250,
		//		maxWidth : 350,
		//		maxHeight : 350,
				autoShow : true,
				title : '회원가입',
//				layout : 'center',
				//모달
				modal : true,  
				// closable : false : 닫기버튼 없에기
		//		closable : false,
				//resizable : false : 창 사이즈 변환 불가
		//		resizable : false,
				items : [{
					xtype: 'panel'
					 ,layout: 'table'
		    	    ,layoutConfig: {
		            columns: 2
			        }
			        ,anchor: '100%'
			        ,defaults: {
			            border: true
			            //,layout: 'form'
			            //,labelWidth: 15
			            ,style: {
			                marginTop: '5px'
			                ,paddingRight: '10px'
			            }
			        },
			        items : [{
							xtype : 'textfield',
							fieldLabel : '아이디',
							name : 'user_id'
							
						},{
						//라디오 버튼 
							xtype : 'button',
							text : "중복확인",
							handler : function(btn){  
								
								var user_id = btn.up('window').down("component[name=user_id]").value;
								if(user_id == ""){
									alert("아이디를 입력해주세여");
									flag = false;
									return false;
								}
		//						
								
								Ext.Ajax.request({
									url : '/board/checkUserId',
									method : 'POST',
									params : {
										user_id : user_id
									}, 
									success : function(response){
										var check = Ext.decode(response.responseText).check;
										console.log("check",check);
										
										if(check == 0){			
											alert("사용가능한 아이디입니다");
											flag = true;
										}else{
											alert("중복되는 아이디입니다.");
										}
				//						console.log("success", Ext.decode(response.responseText));
				//						var store = obj.down("grid").getStore();
				//						console.log("store", store);
				//						// 데이터를 배열로 넣을 때
				//						store.loadData(result.empList);
				//						obj.down("panel").update(result.empCnt);
									},
									failure : function(response){
										console.log(response);
									}
								});
								
								
							}
						}]
					
					
				},{
					xtype : 'textfield',
					inputType : 'password',
					fieldLabel : '비밀번호',
					name : 'pass'
				},{
					xtype : 'textfield',
					inputType : 'password',
					fieldLabel : '비밀번호확인',
					name : 'pass2'
				},{
					xtype : 'textfield',
					fieldLabel : '이름',
					name : 'user_nm'
				},{
					xtype : 'numberfield',
					fieldLabel : '나이',
					name : 'age'
				},{
					xtype: 'radiogroup',
					id:'radiogroup'
					 ,layout: 'table'
		    	    ,layoutConfig: {
		            columns: 2
			        }
			        ,anchor: '100%'
			        ,defaults: {
			            border: true
			            //,layout: 'form'
			            //,labelWidth: 15
			            ,style: {
			                marginTop: '5px'
			                ,paddingRight: '10px'
			            }
			        },
			        items : [{
							xtype : 'radiofield',
							fieldLabel : '성별',
							boxLabel : '남성',
							name : 'gender',
							inputValue : '남성'
						},{
						//라디오 버튼 
							xtype : 'radiofield',
							name : "gender",
							boxLabel : '여성',
							inputValue : '여성'
						}]
			        
				},{
					xtype : 'button',
					text : '가입하기',
					handler : function(btn){  
						var user_id = btn.up('window').down("component[name=user_id]").value;
						var pass = btn.up('window').down("component[name=pass]").value;
						var pass2 = btn.up('window').down("component[name=pass2]").value;
						var user_nm = btn.up('window').down("component[name=user_nm]").value;
						
						var age = btn.up('window').down("component[name=age]").value;
						var gender = btn.up('window').down("component[name=gender]").boxLabel;
//						console.log("라디오",Ext.getCmp('radiogroup').getChecked().getInputValue());
//						var gender = Ext.getCmp('radiogroup').getChecked().value;
//						alert(user_id );
//						alert(pass);
//						alert(age);
//						alert(gender);
						
						if(flag == false){
							alert("아이디 중복검사를 확인하세요");
							return true;
						}
						if(pass != pass2){
							alert("비밀번호가 일지하지 않습니다.");
							return false;
						}
						if(user_id=="" || pass==""||pass2==""||user_nm==""||age==""||gender==""){
							alert("모든 항목을 기입해주세요");
							return false;
						}
						Ext.Ajax.request({
							url : '/board/registUser',
							method : 'POST',
							params : {
								user_id : user_id,
								pass : pass,
								user_name : user_nm,
								age : age,
								gender : gender
							}, 
							success : function(response){
								var check = Ext.decode(response.responseText).insertCnt;
								console.log("check",check);
								if(check == 1 ){			
									alert("회원가입에 성공했습니다.");
								}else{
									alert("회원가입 실패");
								}
		//						console.log("success", Ext.decode(response.responseText));
		//						var store = obj.down("grid").getStore();
		//						console.log("store", store);
		//						// 데이터를 배열로 넣을 때
		//						store.loadData(result.empList);
		//						obj.down("panel").update(result.empCnt);
							},
							failure : function(response){
								console.log(response);
							}
						});
						
						
					}
											
				}],
				
				//maximizable : true 최대화 생성 min max 없어야함
//				maximizable : true
			});
			}
		}]
	}]
});
