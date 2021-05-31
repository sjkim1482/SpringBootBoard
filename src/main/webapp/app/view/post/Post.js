/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */


Ext.define('ExtJSBoard.view.post.Post', {
	
	extend: 'Ext.grid.Panel',
    xtype: 'postList',
    title : '게시판',
    columnLines : true,
    listeners : {
		//boxready 이거 중요! 
		boxready : function(obj){
			Ext.Ajax.request({
				url : 'http://localhost/board/selectPostList',
				method : 'POST',
				params : {
					board_no : board_no, 
					page : page_no,
					pageSize : 10
				},
				success : function(response){
					var result = Ext.decode(response.responseText);
					console.log("S",result);
					console.log("success", Ext.decode(response.responseText).postList);
					var store = obj.getStore();
					var postList = Ext.decode(response.responseText).postList;
					console.log("store", store);
					console.log("userList", store.loadData(result.postList));
					// 데이터를 배열로 넣을 때
					store.loadData(result.postList);
					
					var page = obj.up("viewport").down("component[region=center]");
					var pagination = Ext.decode(response.responseText).pagination;
					page.add(Ext.apply({
								xtype : 'button',
								text : "<",
								name : 1,
								handler : function(btn){
									var page = btn.up("viewport").down("component[region=center]");
									page_no = btn.name;
									page.removeAll(true);
									page.add(Ext.apply({
										xtype: 'postList'
									}));
								}
						}));
					
					
					for(let i = 1; i<=pagination; i++){
						page.add(Ext.apply({
								xtype : 'button',
								text : i,
								name : i,
								handler : function(btn){
									var page = btn.up("viewport").down("component[region=center]");
									page_no = btn.name;
									page.removeAll(true);
									page.add(Ext.apply({
										xtype: 'postList'
									}));
								}
						}));
					}
					
					page.add(Ext.apply({
								xtype : 'button',
								text : ">",
								name : pagination,
								handler : function(btn){
									var page = btn.up("viewport").down("component[region=center]");
									page_no = btn.name;
									page.removeAll(true);
									page.add(Ext.apply({
										xtype: 'postList'
									}));
								}
						}));
					
//					obj.down("panel").update(result.empCnt);
				},
				failure : function(response){
					console.log(response);
				}
			});
		},
		rowclick : function(btn){
			
			var grid = btn.up("grid"); 
		    var row = grid.getSelection()[0]; //선택한 행 객체
		    var thisdidx = btn.lastFocused.rowIdx; // 선택한 행의 인덱스. 이 코드에서는 쓰이지 않지만 다른데서 이 인덱스 값으로 선택한 행을 컨트롤 할 수 있음.
		    post_no = row.get("post_no");         //선택한 행에서 IDX라는 컬럼의 값을 가져옴
			var del_code = row.get("del_code");
		 	
		 	if(del_code == 0){
				alert("삭제된 게시글 입니다.");
				return false;
			}
			
			var page = btn.up("viewport").down("component[region=center]");
			page.removeAll(true);
			page.add(Ext.apply({
				xtype: 'postView'
			}));
		 	
		    
		 	
		} 


	},
	plugins : 'cellediting',
   	columns : [{
		dataIndex : 'post_no',
		hidden : true
	},{
		dataIndex : 'del_code',
		hidden : true
	},{
		text : '번호',
		flex : 0.5,
		dataIndex : 'rn'
	},{
		text : '제목',
		flex : 5,
		dataIndex : 'title'
	},{
		text : '작성자',
		flex : 1,
		dataIndex : 'user_id'
	},{
		text : '등록일',
		flex : 1,
		dataIndex : 'reg_dt',
		renderer : function(value){
			var date = new Date(value);
			var year = date.getFullYear();
			var month = (1+date.getMonth());
			month = month >= 10 ? month : '0' + month;
			var day = date.getDate();
			day = day >= 10 ? day : '0' +day;
			return year + "-" + month +"-" + day;
		}
	},{
		text : '조회수',
		flex : 1,
		dataIndex : 'views'
	}],

	store : {
		fields : ['post_no','title','user_id','reg_dt','views'],
		data : []
	},
	tbar : [{
		xtype : 'button',
		text : '게시글 작성',
		name : board_no,
		handler : function(btn){

			var page = btn.up("viewport").down("component[region=center]");
			page.removeAll(true);
			page.add(Ext.apply({
				xtype : 'insertPost'
			}));
		}
	}]
	
    
});
