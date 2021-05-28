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
		title : '게시판'
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
					var centerPage = obj.up("viewport").down("component[region=center]");
					centerPage.removeAll(true);
					centerPage.add({
						xtype : record.get("page")
					})
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
