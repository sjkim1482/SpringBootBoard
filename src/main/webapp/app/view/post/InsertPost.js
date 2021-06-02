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
	id: 'insertPostForm',
	columnLines: true,
	title: '게시글 작성',
	items: [{
		xtype: 'textfield',
		fieldLabel: '제목',
		name: 'title',
		width: 1600
	}, {
		xtype: 'htmleditor',
		width: 1600,
		height: 600,
		name: 'cont',
		fieldLabel: '내용'
	}, {
		xtype: 'filefield',
		//라벨 정의
		multiple: 'multiple',
		fieldLabel: '파일첨부',
		buttonText: '찾아보기',
		//<input type="file" name="fileupload"> 와 동일하게 서버에서 받기위한 name명이 uploadFile
		name: 'uploadFile',
		listeners: {
			afterrender: function(fileObj) {
				//파일태그옵션에 multiple이라는 옵션을 정의 
				fileObj.fileInputEl.set({
					multiple: 'multiple'
				});
			},
		}

	}],
	fbar: [{
		xtype: 'button',
		text: '등록',
		
		
	
		//게시판등록(제목, 내용, 파일 처리)
		
		handler: function(btn) {
			
			//id가 insertPostForm인 form의 정보를가져옴
			var frm = btn.up("#insertPostForm").getForm();
			console.log("frm", frm)
			// 입력한 제목을 변수에 담아줌
			var title = btn.up('form').down("component[name=title]").value;
			console.log(btn.up('form').down("component[name=cont]"));
			// 입력한 내용을 변수에 담아줌
			var cont = btn.up('form').down("component[name=cont]").value;
			
			
			//submit 처리 시작
			frm.submit({

				url: '/board/insertPost',
				method: "post",
				
				params: {
					board_no: board_no,
					title: title,
					cont: cont
				},

				success: function(frm, response) {
					console.log("등록 성공!");
					console.log("response", response);
					console.log("response", Ext.decode(response.response.responseText));
					// 컨트롤러에서 반환한 json 데이터를 변환하여 변수에 담아줌
					
					var insertCnt = Ext.decode(response.response.responseText).insertCnt;
					// 등록에 성공시 작성한 게시글로 이동시키기위해 게시글번호(기본키)를 받아옴
					post_no = Ext.decode(response.response.responseText).max_post_no;
					console.log("insertCnt", insertCnt);
					if (insertCnt == 1) {
						alert("게시글이 생성되었습니다.");
						var page = btn.up("viewport").down("component[region=center]");
						page.removeAll(true);
						page.add(Ext.apply({
							xtype: 'postView'
						}));
					} else {
						alert("게시글 생성오류");
		
					}
				},
				failure: function(frm, response) {

					console.log("failure : ", response);
				}

			});
			//submit 처리 끝
			
			
		
			
			


		}
	}]

});
