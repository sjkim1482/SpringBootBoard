/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */


Ext.define('ExtJSBoard.view.post.PostView', {
	
	extend: 'Ext.grid.Panel',
    xtype: 'postView',
    title : '게시판',
    columnLines : true,
    listeners : {
		//boxready 이거 중요! 
		boxready : function(obj){
			Ext.Ajax.request({
				url : '/board/postView',
						method : 'POST',
						params : {
							post_no : post_no
						},
						success : function(response){
							post = Ext.decode(response.responseText).post;
							commentsList = Ext.decode(response.responseText).commentsList;
							fileList = Ext.decode(response.responseText).fileList;
							s_user_id= Ext.decode(response.responseText).s_user_id;
							console.log("post",post);
							
							var date = new Date(post.reg_dt);
							var year = date.getFullYear();
							var month = (1+date.getMonth());
							month = month >= 10 ? month : '0' + month;
							var day = date.getDate();
							day = day >= 10 ? day : '0' +day;
							var writeDate =  year + "-" + month +"-" + day;
						
							var page = obj.up("viewport").down("component[region=center]");
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
									html : '<h2>내용</h2> '+post.cont+"<br><br><br>"
								},{
									xtype :'panel',
									html : '작성자 : ' + post.user_id +'<br><br><br>'
								},{
									xtype :'panel',
									html : '작성일 : ' + '[' + writeDate + ']<br><br><br>'
								},{
									xtype :'panel',
									html : '조회수 : ' + post.views+"<br><br><br>"
								},{
									html : '<h2>첨부파일</h2>'
								},{
									id : "fileForm"
								},{
									html : '<h2>댓글목록</h2>',
								},{
									id : "commentsForm"
								},{
									layout : 'table',
									
									items : [{
										xtype :'textarea',
										name : 'com_cont',
										id : 'com_cont'
									},{
										xtype : 'button',
										text : '등록',
										handler : function(btn){
											com_cont = btn.up("viewport").down("#com_cont").value;
											console.log("com_cont",com_cont);
											Ext.Ajax.request({
												url : '/board/insertComment',
												method : "POST",
												params : {
													post_no : post_no,
													com_cont : com_cont
												},
												success : function(response){
													var check = Ext.decode(response.responseText).insertCnt;
													console.log("check",check);
													if(check == 1){
														alert("댓글이 생성되었습니다.");
														var page = btn.up("viewport").down("component[region=center]");
														page.removeAll(true);
														page.add(Ext.apply({
															xtype : 'postView'
														}));
													}else{
														alert("댓글 생성오류");
													}
												},
												failure : function(response){
													console.log(response);
												}
												
											})
										}
									}]
								}],
								bbar : [{
								xtype : 'button',
								text : '답글달기',
								handler : function(btn){
									pre_post_no = btn.up("viewport").down("#post_no").value;
									board_no = btn.up("viewport").down("#board_no").value;
									var page = btn.up("viewport").down("component[region=center]");
									page.removeAll(true);
									page.add(Ext.apply({
										xtype : 'replyPost'
									}));
									
								
								}
							}]
							}));
							//여서부터 파일처리
							fileform = page.down("#fileForm");
							for(idx in fileList){
								fileform.add(Ext.apply({
									xtype : 'panel',
									html : fileList[idx].file_nm,
									value : fileList[idx].file_no,
									listeners: {
										render: function(c) {
											c.body.on('click', function() {
											 	window.open('/board/fileDownload?file_no='+fileList[idx].file_no, "_blank");
											 
											 
											});
										},
										scope: this
									}
//									handler : function(btn){
//										alert("눌림!");
//									}
//							        click:function(){
//							        	alert("눌림!");
//							        }
								
								}))
							}
							
							
							//여서부터 댓글처리
							com = page.down("#commentsForm");
							console.log("com",com);
							console.log("commentsList",commentsList);
							console.log("s_user_id",s_user_id);
//							for(let i = 0; i<commentsList.length;i++){
							for(idx in commentsList){
								var date = new Date(commentsList[idx].reg_dt);
								var year = date.getFullYear();
								var month = (1+date.getMonth());
								month = month >= 10 ? month : '0' + month;
								var day = date.getDate();
								day = day >= 10 ? day : '0' +day;
								var writeDate =  year + "-" + month +"-" + day;
								
								if(commentsList[idx].user_id == s_user_id){
									com.add(Ext.apply({
										items : [{
											xtype : "panel",
											name : 'comtext',
//											html : commentsList[idx].com_cont + "&nbsp;&nbsp;&nbsp;&nbsp;["+ writeDate +" / "+ commentsList[idx].user_id +"]" ,
											layout: 'table', 
											items : [{
												xtype : "panel",
												html : commentsList[idx].com_cont + "&nbsp;&nbsp;&nbsp;&nbsp;["+ writeDate +" / "+ commentsList[idx].user_id +"]&nbsp;&nbsp;&nbsp;&nbsp;" ,
												name : "com_no",
												value : commentsList[idx].com_no
											},{
												xtype : "button",
												text : "삭제",
												handler : function(btn){
//													com_no = btn.up("panel[name=comtext]").down("panel[name=com_no]").value;
													com_no = btn.up("panel[name=comtext]").down("panel[name=com_no]").value;
													console.log("com_no",com_no);
													var comdelCheck = confirm("삭제하시겠습니까?");
													if(comdelCheck == false){
														return false;
													}
													Ext.Ajax.request({
														url : '/board/deleteComments',
														method : 'POST',
														params : {
															com_no : com_no
														},
														success : function(response){
															var deleteCnt = Ext.decode(response.responseText).deleteCnt;
															console.log("check",deleteCnt);
															if(deleteCnt == 1){
																alert("댓글이 삭제되었습니다.");
																
																var page = btn.up("viewport").down("component[region=center]");
																page.removeAll(true);
																page.add(Ext.apply({
																	xtype : 'postView'
																}));
																
																	
															}else{
																alert("댓글 삭제오류");
															}

														},
														failure : function(response){
															console.log(response);
														}
													});
													
												}
											}]
										}]
									}));
								}else{
									com.add(Ext.apply({
										xtype : "panel",
										html : commentsList[idx].com_cont + "&nbsp;&nbsp;&nbsp;&nbsp;["+ writeDate +" / "+ commentsList[idx].user_id +"]"  
									}));
								}
							}
							
							
							
							var writerCheck = Ext.decode(response.responseText).writerCheck;
							console.log("writerCheck",writerCheck);
							
							if(writerCheck == 1){
								page.add(Ext.apply({
									fbar : [{
										xtype : 'button',
										text : '수정',
										handler : function(btn){
											Ext.Ajax.request({
												url : '/board/updatePost',
												method : 'GET',
												params : {
													post_no : post_no
												},
												success : function(response){
														post = Ext.decode(response.responseText).post;
														console.log("post",post);
														var page = btn.up("viewport").down("component[region=center]");
														page.removeAll(true);
														page.add(Ext.apply({
//															extend: 'Ext.form.Panel',
														    xtype: 'form',
														    columnLines : true,
														    title : '게시글 수정',
														    items : [{
																xtype : 'textfield',
																fieldLabel : '제목',
																name : 'title',
																value : post.title,
																width : 1600
															},{
																xtype :'htmleditor',
																width : 1600,
																height : 600,
																name : 'cont',
																value : post.cont,
																fieldLabel : '내용'
															},{
														            //<input type="file" /> 와 같은개념 
														            xtype : 'filefield', 
														            //기존에 않넣어도 됐었는데 추가된듯... 
														            reference: 'basicFile', 
														            name : 'uploadFile', 
														            fieldLabel : '파일첨부', 
														            //fieldLabel의 위치 
														            labelAlign : 'left', 
														            allowBlank : false, 
														            // html5의 placeholder와 유사하다 
														            emptyText : 'Add SQL File...', 
														            // 속성을 정의안하면 default Browser.. 으로 버튼이 생성된다. 
														            buttonText : '찾아보기'
														
														            
														        }],
															fbar : [{
																xtype :'button',
																text : '수정',
																handler : function(btn){
																			var upCon =  confirm("수정하시겠습니까?");
																			if(upCon == false){
																				return false;
																			}
																			
																			var frm = btn.up("form").getForm();
																			console.log("frm",frm);
																			var title = btn.up('form').down("component[name=title]").value;
																			console.log(btn.up('form').down("component[name=cont]"));
																			var cont = btn.up('form').down("component[name=cont]").value;
																			var uploadFile = btn.up('form').down("component[name=uploadFile]").value;
																			console.log("uploadFile",uploadFile);
//																			frm.submit({
																			Ext.Ajax.request({
																				url: '/board/updatePost',
																				method : "post",
																				params : {
																					post_no : post_no,
																					title : title,
																					cont : cont,
																					},
																				success : function(response){ 
//																				success : function(fp, response){ 
														
																				var updateCnt = Ext.decode(response.responseText).updateCnt;
																					console.log("updateCnt",updateCnt);
																					if(updateCnt == 1){
																						alert("게시글이 수정되었습니다.");
														
																						var page = btn.up("viewport").down("component[region=center]");
																						page.removeAll(true);
																						page.add(Ext.apply({
																							xtype : 'postView'
																						}));
																					}else{
																						alert("게시글 수정오류");
																					} 
																				}
														
																			});
														
																			
																		}
															}]
														}));
													},
													failure : function(response){
														console.log(response);
													}
											})
										}
									},{
										xtype : 'button',
										text : '삭제',
										handler : function(btn){
											var delCheck = confirm("정말 삭제하시겠습니까?");
											if(delCheck == true){
												Ext.Ajax.request({
													url : '/board/deletePost',
													method : 'POST',
													params : {
														post_no : post_no
													},
													success : function(response){
														var deleteCheck = Ext.decode(response.responseText).deleteCheck;
														console.log("deleteCheck",deleteCheck);
														if(deleteCheck == 1){
															alert("게시글이 삭제되었습니다.");
							
															var page = btn.up("viewport").down("component[region=center]");
															page.removeAll(true);
															page.add(Ext.apply({
															xtype : 'postList'
															}));
														}else{
															alert("게시글 삭제오류");
														}
													},
													failure : function(response){
														console.log(response);
													}
												});
											}
										
										}
									}]
								}));
							}
							
							
						},
						failure : function(response){
							console.log(response);
						}
					});

			
		    
		 	
		} 





	},



});
