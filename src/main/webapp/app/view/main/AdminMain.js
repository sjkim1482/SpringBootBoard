/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
//var r = [], sum = 0, time;
//
//    for (var i = 0 ; i < 10 ; i++) {
//        r.push(i);
//    }
var admin_flag = 1
Ext.define('ExtJSBoard.view.main.AdminMain', {
    extend: 'Ext.container.Viewport',
    xtype: 'adminMain',
	layout : 'border',
	
	items : [{
		xtype : 'panel',
		region : 'north',
		split : true,
		flex : 1,
		border : 1,
		title : '게시판',
		items : [{
			xtype : 'button',
			text : '로그아웃',
			handler : function(btn){
				Ext.Ajax.request({
						url : '/board/logout',
						method : 'POST',
					
						success : function(response){
							var logoutCheck = Ext.decode(response.responseText).logoutCheck;
							console.log("logoutCheck",logoutCheck);
							if(logoutCheck == 1){
								admin_flag = 0;
								login_flag = false;
								btn.up("adminMain").removeAll();
								Ext.widget("login");
//								login_flag = true;
							}else{
								alert("로그아웃 오류");
							}
						},
						failure : function(response){
							console.log(response);
						}
					});
			}
		},{
			xtype : 'button',
			text : '게시판 페이지 이동',
			handler : function(btn){
				admin_flag = 0;
				btn.up("adminMain").removeAll();
				Ext.widget("main");
			}
		}]
	},{
		xtype : 'panel',
		split : true,
		region : 'west',
		flex : 1,
		border : 1,
		title : '관리자 목록',
		layout : 'fit',
		
		items : [{
			xtype : 'treelist',
			listeners : {
				selectionchange : function(obj, record){
					if(admin_flag == 1){
						if(login_flag){
							var centerPage = obj.up("viewport").down("component[region=center]");
							centerPage.removeAll(true);
							centerPage.add({
								xtype : record.get("page")
							})
						}
					}
//					console.log(record.get("page"));
				}
			},
			store : {
				root : {
					expanded : true,
					children : [{
						text : '게시판 관리',
						page : 'boardList',
						leaf : true
					},
					
//					{
//
//							text : '게시판 목록',
//							page : 'postList',
//							leaf : true
////							expanded : false,
//							
////						proxy :{
////							type : 'ajax',
////							url : 'http://localhost/board/selectBoardList',
////							reader:{
////								type : 'json',
////								rootProperty : 'children'
////							}
////		
////						}
//						
//					},
					
					{
						text : '회원 목록',
						page : 'userList',
						leaf : true
					}]
				}
			}
		}]
		},{
			xtype : 'panel',
			region : 'center',
			flex : 9,
			border : 1
		}]
	})
