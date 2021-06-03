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
var board_no;
var page_no;
var post;
var maindata;
var login_flag = true;
var board_nm = '';
Ext.define('ExtJSBoard.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'main',
    name : 'mainView1',
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
							login_flag = false;
							var logoutCheck = Ext.decode(response.responseText).logoutCheck;
							console.log("logoutCheck",logoutCheck);
							if(logoutCheck == 1){
								admin_flag = 1;
								console.log("container",btn.up("container").up("container"));
								console.log("viewport",btn.up("viewport"));
//								if(maindata == null){
//									maindata = btn.up("container[name=mainView]");
//								}
//								btn.up("container").up("container").up("Ext").removeAll();
//								btn.up("container[name=mainView1]").down("container[region=center]").removeAll(true);
								btn.up("container[name=mainView1]").removeAll();
//								btn.up("container[name=mainView1]").removeAll();
								Ext.widget("login");
							}else{
								alert("로그아웃 오류");
							}
						},
						failure : function(response){
							console.log(response);
						}
					});
			}
		}],
		listeners : {
			boxready : function(obj){
				Ext.Ajax.request({
					url : '/board/adminCheck',
					method : 'POST',
				
					success : function(response){
						
						var admin_code = Ext.decode(response.responseText).admin_code;
						console.log("admin_code",admin_code);
						if(admin_code == 1){
							var page = obj.up("viewport").down("component[region=north]")
							page.add(Ext.apply({
								xtype : "button",
								text : '관리자페이지 이동',
								handler : function(btn){
//									login_flag = false;
									admin_flag = 1;
									btn.up("main").removeAll();
									Ext.widget("adminMain");
//									login_flag = true;
								}
							}));
						}
					},
					failure : function(response){
						console.log(response);
					}
				});
			}
		}
		
		
	},{
		xtype : 'panel',
		split : true,
		region : 'west',
		flex : 1,
		border : 1,
		title : '게시판 목록',
		layout : 'fit',

		items : [{
			xtype : 'treelist',
			listeners : {
				selectionchange : function(obj, record){
					
					console.log("진입!");
//					console.log("obj : ",obj._selection);
//					console.log("obj : ",obj._selection.data.id);
//					console.log("obj.data",obj._selection.data);
					console.log("record",record);
					if(login_flag && admin_flag == 0){
						board_no = obj._selection.data.id;
						
						page_no = 1;
						pageSizeStr = "";
						searchCheckStr  = "";
						searchStr  = "";
						board_nm = obj._selection.data.text;
						console.log("board_nm", board_nm);
						var centerPage = obj.up("viewport").down("component[region=center]");
	//					maindata = obj.up("container[name=mainView1]");
	//					console.log("maindata",maindata);
						centerPage.removeAll(true);
						centerPage.add({
							xtype: 'postList'
						})
					}
				}
			},
			store : {
				root : {
					expanded : true,
				},
						proxy :{
							type : 'ajax',
							url : '/board/selectBoardList',
							method : 'GET',
							reader:{
								type : 'json',
								rootProperty : 'children'
							}
		
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
