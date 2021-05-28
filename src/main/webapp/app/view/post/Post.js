/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
 
/*var checkWriter = function checkWriter(writer){
	if(writer == 1){
		bbar : [{
			xtype : 'button',
			text : '답글달기',
			handler : function(btn){
				var page = btn.up("viewport").down("component[region=center]");
				page.removeAll(true);
				page.add(Ext.apply({
					xtype : 'insertPost'
				}));
			
			}	
								
		}]
	}
}*/
 
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
		    var post_no = row.get("post_no");         //선택한 행에서 IDX라는 컬럼의 값을 가져옴
		
		 	
		 	Ext.Ajax.request({
						url : 'http://localhost/board/postView',
						method : 'POST',
						params : {
							post_no : post_no
						},
						success : function(response){
							var post = Ext.decode(response.responseText).post;
							console.log("post",post);
							
							var date = new Date(post.reg_dt);
							var year = date.getFullYear();
							var month = (1+date.getMonth());
							month = month >= 10 ? month : '0' + month;
							var day = date.getDate();
							day = day >= 10 ? day : '0' +day;
							var writeDate =  year + "-" + month +"-" + day;
						
							var page = btn.up("viewport").down("component[region=center]");
							page.removeAll(true);
							page.add(Ext.apply({
								extend: 'Ext.panel.Panel', 
								title : post.title,
								columnLines : true,
								items : [{
									id : 'post_no',
									value : post.post_no
									
								},{
									id : 'board_no',
									value : post.board_no
									
								},{
									xtype :'panel',
									html : '작성자 : ' + post.user_id + ' / [' + writeDate + ']<br><br><br>'
								},{
									xtype :'panel',
									html : '내용 <br> '+post.cont+"<br><br><br>"
								},{
									xtype :'panel',
									html : '조회수 : ' + post.views+"<br><br><br>"
								}],
//								checkWriter(writer),
								bbar : [{
								xtype : 'button',
								text : '답글달기',
								handler : function(btn){
									pre_post_no = btn.up("viewport").down("#post_no").value;
									board_no = btn.up("viewport").down("#board_no").value;
									var page = btn.up("viewport").down("component[region=center]");
									page.removeAll(true);
									page.add(Ext.apply({
										title : '게시글 작성',
									    items : [{
											xtype : 'textfield',
											fieldLabel : '제목',
											name : 'title',
											width : 1600
										},{
											xtype :'htmleditor',
											width : 1600,
											height : 700,
											name : 'cont',
											fieldLabel : '내용'
										}],
										fbar : [{
											xtype :'button',
											text : '등록',
											handler : function(btn){
														var title = btn.up('panel').down("component[name=title]").value;
														console.log(btn.up('panel').down("component[name=cont]"));
														var cont = btn.up('panel').down("component[name=cont]").value;
												
														
														Ext.Ajax.request({
															url : 'http://localhost/board/insertReply',
															method : 'POST',
															params : {
																board_no : board_no,
																pre_post_no : pre_post_no,
																title : title,
																cont : cont
															},
															success : function(response){
																var check = Ext.decode(response.responseText).insertCnt;
																console.log("check",check);
																if(check == 1){
																	alert("게시글이 생성되었습니다.");
									//								btn.up("window").close();
									//								Ext.widget("main");
																	var page = btn.up("viewport").down("component[region=center]");
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
									}));
								
								}
							}]
							}));
							
							
						},
						failure : function(response){
							console.log(response);
						}
					});
			
//			var page = btn.up("viewport").down("component[region=center]");
////			page.removeAll(true);
//			page.add(Ext.apply({
//				xtype : 'PostView'
//			}));
			
		    
		 	
		} 


		
//		cellclick : function(thisGrid, rowIndex, columnIndex, e){
//			var columnid = thisGrid.getColumnModel().getColumnAt(columnIndex).name;
//			alert(columnid);
//       	}
	},
	plugins : 'cellediting',
   	columns : [{
		dataIndex : 'post_no',
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
//	listeners : {
//		cellclick : function(grid, record){
//			alert("클릭");
//       	}
//	},
	store : {
		fields : ['post_no','title','user_id','reg_dt','views'],
		data : []
	},
	tbar : [{
		xtype : 'button',
		text : '게시글 작성',
		name : board_no,
		handler : function(btn){
//			console.log('board_no : ',btn.name); 
//			board_no = btn.name;
			var page = btn.up("viewport").down("component[region=center]");
			page.removeAll(true);
			page.add(Ext.apply({
				xtype : 'insertPost'
			}));
		}
	}]
	
	
	
	
	
//    extend: 'Ext.grid.Panel',
//    xtype: 'postList',
//    title : '게시판',
//    columnLines : true,
//    listeners : {
//		//boxready 이거 중요! 
//		boxready : function(obj){
//			Ext.Ajax.request({
//				url : 'http://localhost/board/selectPostList',
//				method : 'POST',
//				params : {
//					board_no : board_no,
//					page : 1,
//					pageSize : 10
//				},
//				success : function(response){
//					var result = Ext.decode(response.responseText);
//					console.log("S",result);
//					console.log("success", Ext.decode(response.responseText).postList);
//					var store = obj.getStore();
//					var postList = Ext.decode(response.responseText).postList;
//					console.log("store", store);
//					console.log("userList", store.loadData(result.postList));
//					// 데이터를 배열로 넣을 때
//					store.loadData(result.postList);
//					
////					obj.down("panel").update(result.empCnt);
//				},
//				failure : function(response){
//					console.log(response);
//				}
//			});
//		},
//		rowclick : function(btn){
//			
//			var grid = btn.up("grid"); 
//		    var row = grid.getSelection()[0]; //선택한 행 객체
//		    var thisdidx = btn.lastFocused.rowIdx; // 선택한 행의 인덱스. 이 코드에서는 쓰이지 않지만 다른데서 이 인덱스 값으로 선택한 행을 컨트롤 할 수 있음.
//		    var post_no = row.get("post_no");         //선택한 행에서 IDX라는 컬럼의 값을 가져옴
//	
//		 	
//		 	Ext.Ajax.request({
//						url : 'http://localhost/board/postView',
//						method : 'POST',
//						params : {
//							post_no : post_no
//						},
//						success : function(response){
//							var post = Ext.decode(response.responseText).post;
//							console.log("post",post);
//							
//							var date = new Date(post.reg_dt);
//							var year = date.getFullYear();
//							var month = (1+date.getMonth());
//							month = month >= 10 ? month : '0' + month;
//							var day = date.getDate();
//							day = day >= 10 ? day : '0' +day;
//							var writeDate =  year + "-" + month +"-" + day;
//							
//							var page = btn.up("viewport").down("component[region=center]");
//							page.removeAll(true);
//							page.add(Ext.apply({
//								extend: 'Ext.panel.Panel', 
//								title : post.title,
//								columnLines : true,
//								items : [{
//									id : 'post_no',
//									value : post.post_no
//									
//								},{
//									xtype :'panel',
//									html : '작성자 : ' + post.user_id + ' / [' + writeDate + ']<br><br><br>'
//								},{
//									xtype :'panel',
//									html : '내용 <br> '+post.cont+"<br><br><br>"
//								},{
//									xtype :'panel',
//									html : '조회수 : ' + post.views+"<br><br><br>"
//								}],
////								checkWriter(writer),
//								bbar : [{
//								xtype : 'button',
//								text : '답글달기',
//								handler : function(btn){
//									var pre_post_no = btn.up("viewport").down("#post_no").value;
//									
//									var page = btn.up("viewport").down("component[region=center]");
//									page.removeAll(true);
//									page.add(Ext.apply({
//										title : '게시글 작성',
//									    items : [{
//											xtype : 'textfield',
//											fieldLabel : '제목',
//											name : 'title',
//											width : 1600
//										},{
//											xtype :'htmleditor',
//											width : 1600,
//											height : 700,
//											name : 'cont',
//											fieldLabel : '내용'
//										}],
//										fbar : [{
//											xtype :'button',
//											text : '등록',
//											handler : function(btn){
//														var title = btn.up('panel').down("component[name=title]").value;
//														console.log(btn.up('panel').down("component[name=cont]"));
//														var cont = btn.up('panel').down("component[name=cont]").value;
//												
//														
//														Ext.Ajax.request({
//															url : 'http://localhost/board/insertReply',
//															method : 'POST',
//															params : {
//																pre_post_no : pre_post_no,
//																title : title,
//																cont : cont
//															},
//															success : function(response){
//																var check = Ext.decode(response.responseText).insertCnt;
//																console.log("check",check);
//																if(check == 1){
//																	alert("게시글이 생성되었습니다.");
//									//								btn.up("window").close();
//									//								Ext.widget("main");
//																	var page = btn.up("viewport").down("component[region=center]");
//																	page.removeAll(true);
//																	page.add(Ext.apply({
//																	xtype : 'postList'
//																	}));
//																}else{
//																	alert("게시글 생성오류");
//																}
//															},
//															failure : function(response){
//																console.log(response);
//															}
//														});
//														
//													}
//										}]
//									}));
//								
//								}
//							}]
//							}));
//							
//						},
//						failure : function(response){
//							console.log(response);
//						}
//					});
//			
////			var page = btn.up("viewport").down("component[region=center]");
//////			page.removeAll(true);
////			page.add(Ext.apply({
////				xtype : 'PostView'
////			}));
//			
//		    
//		 	
//		} 
//
//
//		
////		cellclick : function(thisGrid, rowIndex, columnIndex, e){
////			var columnid = thisGrid.getColumnModel().getColumnAt(columnIndex).name;
////			alert(columnid);
////       	}
//	},
//	plugins : 'cellediting',
//   	columns : [{
//		dataIndex : 'post_no',
//		hidden : true
//	},{
//		text : '번호',
//		flex : 0.5,
//		dataIndex : 'rn'
//	},{
//		text : '제목',
//		flex : 5,
//		dataIndex : 'title'
//	},{
//		text : '작성자',
//		flex : 1,
//		dataIndex : 'user_id'
//	},{
//		text : '등록일',
//		flex : 1,
//		dataIndex : 'reg_dt',
//		renderer : function(value){
//			var date = new Date(value);
//			var year = date.getFullYear();
//			var month = (1+date.getMonth());
//			month = month >= 10 ? month : '0' + month;
//			var day = date.getDate();
//			day = day >= 10 ? day : '0' +day;
//			return year + "-" + month +"-" + day;
//		}
//	},{
//		text : '조회수',
//		flex : 1,
//		dataIndex : 'views'
//	}],
////	listeners : {
////		cellclick : function(grid, record){
////			alert("클릭");
////       	}
////	},
//	store : {
//		fields : ['title','user_id','reg_dt','views'],
//		data : []
//	},
//	bbar : [{
//		xtype : 'button',
//		text : '게시글 작성',
//		handler : function(btn){
//			var page = btn.up("viewport").down("component[region=center]");
//			page.removeAll(true);
//			page.add(Ext.apply({
//				xtype : 'insertPost'
//			}));
//		}
//	}]
    
});
