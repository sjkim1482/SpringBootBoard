///**
// * This class is the main view for the application. It is specified in app.js as the
// * "mainView" property. That setting automatically applies the "viewport"
// * plugin causing this view to become the body element (i.e., the viewport).
// *
// * TODO - Replace this content of this view to suite the needs of your application.
// */
//Ext.define('ExtJSBoard.view.post.UpdatePost', {
//    extend: 'Ext.form.Panel',
//    xtype: 'updatePost',
//  
//    columnLines : true,
//    title : '게시글 수정',
//    items : [{
//		xtype : 'textfield',
//		fieldLabel : '제목',
//		name : 'title',
//		value : post.title,
//		width : 1600
//	},{
//		xtype :'htmleditor',
//		width : 1600,
//		height : 600,
//		name : 'cont',
//		value : post.cont,
//		fieldLabel : '내용'
//	},{
//            //<input type="file" /> 와 같은개념 
//            xtype : 'filefield', 
//            //기존에 않넣어도 됐었는데 추가된듯... 
//            reference: 'basicFile', 
//            name : 'uploadFile', 
//            fieldLabel : '파일첨부', 
//            //fieldLabel의 위치 
//            labelAlign : 'left', 
//            allowBlank : false, 
//            // html5의 placeholder와 유사하다 
//            emptyText : 'Add SQL File...', 
//            // 속성을 정의안하면 default Browser.. 으로 버튼이 생성된다. 
//            buttonText : '찾아보기'
//
//            
//        }],
//	fbar : [{
//		xtype :'button',
//		text : '등록',
//		handler : function(btn){
//
//
//					var frm = btn.up("form").getForm();
//					console.log("frm",frm);
//					var title = btn.up('form').down("component[name=title]").value;
//					console.log(btn.up('form').down("component[name=cont]"));
//					var cont = btn.up('form').down("component[name=cont]").value;
//					var uploadFile = btn.up('form').down("component[name=uploadFile]").value;
//					console.log("uploadFile",uploadFile);
//					frm.submit({
//						url: 'http://localhost/board/insertPost',
//						method : "post",
//						params : {
//							board_no : board_no,
//							title : title,
//							cont : cont,
//							},
//						success : function(fp, response){ 
//
//						alert("성공!");
//						var check = Ext.decode(response.responseText).insertCnt;
//							console.log("check",check);
//							if(check == 1){
//								alert("게시글이 생성되었습니다.");
//
//								var page = btn.up("viewport").down("component[region=center]");
//								page.removeAll(true);
//								page.add(Ext.apply({
//									xtype : 'postList'
//								}));
//							}else{
//								alert("게시글 생성오류");
//							} 
//						}
//
//					});
//
//					
//				}
//	}]
//    
//});
