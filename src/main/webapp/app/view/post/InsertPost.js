/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('ExtJSBoard.view.post.InsertPost', {
    extend: 'Ext.form.Panel',
    xtype: 'insertPost',
  
    columnLines : true,
    title : '게시글 작성',
    items : [{
		xtype : 'textfield',
		fieldLabel : '제목',
		name : 'title',
		width : 1600
	},{
		xtype :'htmleditor',
		width : 1600,
		height : 600,
		name : 'cont',
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
		text : '등록',
		handler : function(btn){
//					var form = btn.up('form').getForm();
//					console.log("form", form);

					var frm = btn.up("form").getForm();
					console.log("frm",frm);
					var title = btn.up('form').down("component[name=title]").value;
					console.log(btn.up('form').down("component[name=cont]"));
					var cont = btn.up('form').down("component[name=cont]").value;
					var uploadFile = btn.up('form').down("component[name=uploadFile]").value;
					console.log("uploadFile",uploadFile);
					frm.submit({
						url: 'http://localhost/board/insertPost',
						method : "post",
						params : {
							board_no : board_no,
							title : title,
							cont : cont,
							},
						success : function(fp, response){ 
//						var jsonResult = Ext.JSON.decode(res.response.responseText);
//						 var msg = "업로드된 파일명<br/>"; 
//						 Ext.each(jsonResult.fileList,function(obj){ msg += obj.fileName+","; }); msg = msg.substring(0,msg.length-1); Ext.MessageBox.show({ title : '업로드된파일명', msg : msg, buttons : Ext.MessageBox.YES, icon : Ext.MessageBox.INFO }); //한번 submit 처리가 되면 filefield는 초기화 되므로 //다시 filefield에 multiple 속성 설정
//						  panel.down("filefield").fileInputEl.set({ multiple:'multiple' });
						alert("성공!");
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
						}

					});
//					
//					var title = btn.up('panel').down("component[name=title]").value;
//					console.log(btn.up('panel').down("component[name=cont]"));
//					var cont = btn.up('panel').down("component[name=cont]").value;
//					var uploadFile = btn.up('panel').down("component[name=uploadFile]").value;
//					console.log("uploadFile",uploadFile);
					
					
//					Ext.Ajax.request({
//						url : 'http://localhost/board/insertPost',
//						method : 'POST',
//						params : {
//							board_no : board_no,
//							title : title,
//							cont : cont,
//							uploadFile : uploadFile
//						},
//						success : function(response){
//							var check = Ext.decode(response.responseText).insertCnt;
//							console.log("check",check);
//							if(check == 1){
//								alert("게시글이 생성되었습니다.");
////								btn.up("window").close();
////								Ext.widget("main");
//								var page = btn.up("viewport").down("component[region=center]");
//								page.removeAll(true);
//								page.add(Ext.apply({
//									xtype : 'postList'
//								}));
//							}else{
//								alert("게시글 생성오류");
//							}
//						},
//						failure : function(response){
//							console.log(response);
//						}
//					});
					
				}
	}]
    
});
