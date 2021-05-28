/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('ExtJSBoard.view.board.Board', {
    extend: 'Ext.panel.Panel',
    xtype: 'boardList',
//    width : 500,
//    heigth : 500,
    title : '게시판 관리',
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
	        items: [{
				xtype: 'textfield',
				name: 'board_nm'
			},{
				xtype: 'combo',
				width : 100,
				displayField : 'key',
				valueFiled : 'value',
				name : 'check_on',
				value : '활성',
				store : {
					fields : ['key','value'],
					data : [{
						key : '활성',
						value : '1'
					},{
						key : '비활성',
						value : '0'
					}]
				}
	        },{
				xtype: 'button',
				text : '생성',
				handler : function(btn){
					var board_nm = btn.up('panel').down("component[name=board_nm]").value;
					console.log(btn.up('panel').down("component[name=check_on]"));
					var check = btn.up('panel').down("component[name=check_on]").value;
					var check_on = 0; 
					if(check=="활성"){
						check_on = 1;
					}
					
					
					Ext.Ajax.request({
						url : 'http://localhost/board/insertBoard',
						method : 'POST',
						params : {
							board_nm : board_nm,
							check_on : check_on
						},
						success : function(response){
							var check = Ext.decode(response.responseText).insertCnt;
							console.log("check",check);
							if(check == 1){
								alert("게시판이 생성되었습니다.");
//								btn.up("window").close();
//								Ext.widget("main");
							}else{
								alert("게시판 생성오류");
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
//		xtype : 'textfield',
//		layout: 'table',
//		items : [{
//			xtype : 'button',
//			text : '생성'
//		}]
	}]  
    
});
