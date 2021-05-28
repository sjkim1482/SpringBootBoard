/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('ExtJSBoard.view.user.User', {
    extend: 'Ext.grid.Panel',
    xtype: 'userList',
    title : '사용자 목록',
    columnLines : true,
    listeners : {
		//boxready 이거 중요! 
		boxready : function(obj){
			Ext.Ajax.request({
				url : 'http://localhost/board/selectUserList',
				method : 'POST',
				
				success : function(response){
					var result = Ext.decode(response.responseText);
					console.log("S",result);
					console.log("success", Ext.decode(response.responseText).userList);
					var store = obj.getStore();
					var userList = Ext.decode(response.responseText).userList;
					console.log("store", store);
					console.log("userList", store.loadData(result.userList));
					// 데이터를 배열로 넣을 때
					store.loadData(result.userList);
					
//					obj.down("panel").update(result.empCnt);
				},
				failure : function(response){
					console.log(response);
				}
			});
		}
	},
	plugins : 'cellediting',
   	columns : [{
		text : '아이디',
		flex : 1,
		dataIndex : 'user_id'
	},{
		text : '이름',
		flex : 1,
		dataIndex : 'user_name'
	},{
		text : '나이',
		flex : 1,
		dataIndex : 'age'
	},{
		text : '성별',
		flex : 1,
		dataIndex : 'gender'
	}],
	store : {
		fields : ['user_id','user_name','age','gender'],
		data : []
	},bbar : [{
		xtype : 'button',
		text : '엑셀다운로드',
		handler : function(btn){
			window.open('http://localhost/board/userListExcel', "_blank");

		}
	}]
   
});
