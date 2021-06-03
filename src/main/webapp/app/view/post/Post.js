/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
var pageSizeStr = "";
var searchCheckStr  = "";
var searchStr  = "";
Ext.define('ExtJSBoard.view.post.Post', {
	
	extend: 'Ext.grid.Panel',
    xtype: 'postList',
    id : 'postList',
    title : board_nm,
	renderTo : Ext.getBody(),
    columnLines : true,
    listeners : {
		//boxready 이거 중요! 
		boxready : function(obj){
//			var pageSizeStr = obj.up("viewport").down("#pageSize").value;
//			var searchCheckStr = obj.up("viewport").down("#searchCheck").value;
//			var searchStr = obj.up("viewport").down("#searchStr").value;
			
			console.log('pageSize',pageSize);
			console.log('searchCheck',searchCheck);
			console.log('searchStr',searchStr);
			
			Ext.Ajax.request({
				url : '/board/selectPostList',
				method : 'POST',
				params : {
					board_no : board_no, 
					page : page_no,
					pageSizeStr : pageSizeStr,
					searchCheckStr : searchCheckStr,
					searchStr : searchStr
				},
				success : function(response){
					
					obj.up("viewport").down("component[region=center]").setTitle(board_nm);
					var result = Ext.decode(response.responseText);
					var pageVo = Ext.decode(response.responseText).pageVo;
					
					console.log("page_no",pageVo.page);
					console.log("S",result);
					console.log("success", Ext.decode(response.responseText).postList);
					var store = obj.getStore();
					var postList = Ext.decode(response.responseText).postList;
					console.log("store", store);
					console.log("userList", store.loadData(result.postList));
					
					for(idx in postList){
						var level = postList[idx].postLevel;
						for(let i = 2; i<=level; i++){
							postList[idx].title = "RE: "+postList[idx].title
						}
					}
					
					
					
					// 데이터를 배열로 넣을 때
//					store.loadData(result.postList);
					store.loadData(postList);
					
//					
					
					
					var page = obj.up("viewport").down("component[region=center]");
					var pageSizeCombo = page.down("#pageSize").setValue(pageVo.pageSize);
					var searchCheckStrCombo = page.down("#searchCheck").setValue(pageVo.searchCheck);
					var searchStrCombo = page.down("#searchStr").setValue(pageVo.searchStr);
					var paginationPanel = obj.up("viewport").down("#paginationPanel");
//					console.log("pageSizeCombo",pageSizeCombo);
//					console.log("searchCheckStrCombo",searchCheckStrCombo);
//					console.log("searchStrCombo",searchStrCombo);
					
					
					var pagination = Ext.decode(response.responseText).pagination;
					
					if(pageVo.page==1){
						paginationPanel.add(Ext.apply({
							xtype : 'button',
							text : "<",
							name : 1,
							disabled : true,
							handler : function(btn){
								var page = btn.up("viewport").down("component[region=center]");
								page_no = btn.name;
								page.removeAll(true);
								page.add(Ext.apply({
									xtype: 'postList'
								}));
							}
						}));
					}else{
						paginationPanel.add(Ext.apply({
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
					}
					
					for(let i = 1; i<=pagination; i++){
						if(pageVo.page == i){
							paginationPanel.add(Ext.apply({
								xtype : 'button',
								text : i,
								name : i,
								disabled : true,
								handler : function(btn){
									var page = btn.up("viewport").down("component[region=center]");
									page_no = btn.name;
									page.removeAll(true);
									page.add(Ext.apply({
										xtype: 'postList'
									}));
								}
							}));
						}else{
							paginationPanel.add(Ext.apply({
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
						
					}
					if(pageVo.page==pagination){
						paginationPanel.add(Ext.apply({
							xtype : 'button',
							text : ">",
							name : pagination,
							disabled : true,
							handler : function(btn){
								var page = btn.up("viewport").down("component[region=center]");
								page_no = btn.name;
								page.removeAll(true);
								page.add(Ext.apply({
									xtype: 'postList'
								}));
							}
						}));
					}else{
						paginationPanel.add(Ext.apply({
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
					}
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
	bbar : [{
		xtype: 'tbfill'
	},{
		xtype : 'panel',
		id : "paginationPanel"
	},{
		xtype: 'tbfill'
	}],
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
	},{
		xtype : 'tbfill'
	},{
		xtype : 'combo',
		id : 'pageSize',
		fieldLabel : '검색조건',
		displayField : 'label',
		valueField : 'value',
		store : Ext.create('Ext.data.Store',{
			fields : ['label','value'],
			data : [
				['10개씩보기','10'],
				['15개씩보기','15'],
				['20개씩보기','20']
			],
			renderTo: document.body,
				listeners: {
                change: function(fld, oldValue, newValue, eOpts) {
                	var page = fld.up("viewport").down("component[region=center]");
					pageSizeStr = newValue;
					alert(pageSizeStr)
					page.removeAll(true);
					page.add(Ext.apply({
						xtype: 'postList'
					}));
                }
            }
		
			
		}),
	
	},{
		xtype : 'combo',
		id : 'searchCheck',
		displayField : 'label',
		valueField : 'value',
		store : Ext.create('Ext.data.Store',{
			fields : ['label','value'],
			data : [
				['검색기준','3'],
				['제목','0'],
				['작성자','1']
			]
			
		})
		
	},{
		xtype : 'textfield',
		id : 'searchStr'
		
	},{
		xtype : 'button',
		text : '검색',
		handler : function(btn){
			page_no = 1;
			pageSizeStr = btn.up("viewport").down("#pageSize").value;
			searchCheckStr = btn.up("viewport").down("#searchCheck").value;
			searchStr = btn.up("viewport").down("#searchStr").value;
			if(searchCheckStr == null){
				alert("검색조건을 선택해주세요");
				return false;
			}
			
			if(searchCheckStr == 3 && searchStr != ""){
				alert("검색기준을 선택해주세요");
				return false;
			}
			
			var page = btn.up("viewport").down("component[region=center]");
		
			page.removeAll(true);
			page.add(Ext.apply({
				xtype: 'postList'
			}));
		}
		
	},{
		xtype : 'button',
		text : '초기화',
		handler : function(btn){
			pageSizeStr = "";
			searchCheckStr = "";
			searchStr = "";
		
			var page = btn.up("viewport").down("component[region=center]");
		
			page.removeAll(true);
			page.add(Ext.apply({
				xtype: 'postList'
			}));
		}
		
	}]
	
    
});
