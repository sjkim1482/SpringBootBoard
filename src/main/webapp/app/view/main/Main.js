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
Ext.define('ExtJSBoard.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'main',
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
						url : 'http://localhost/board/logout',
						method : 'POST',
					
						success : function(response){
							var check = Ext.decode(response.responseText).insertCnt;
							console.log("check",check);
							if(check == 1){
//								btn.up("window").close();
//								Ext.widget("main");
								var page = btn.up("container");
								page.removeAll(true);
								page.add(Ext.apply({
								xtype : 'postList'
								}));
							}else{
								alert("게시글 생성오류");
							}
						},
						failure : function(response){
							console.log(response);
						}
					});
			}
		}]
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
					console.log("obj : ",obj._selection.data.id);
					console.log("obj.data",obj._selection.data);
					console.log("record",record);
					board_no = obj._selection.data.id;
					page_no = 1;
					var centerPage = obj.up("viewport").down("component[region=center]");
					centerPage.removeAll(true);
					centerPage.add({
						xtype: 'postList'
					})
				}
			},
			store : {
				root : {
					expanded : true,
				},
						proxy :{
							type : 'ajax',
							url : 'http://localhost/board/selectBoardList',
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
