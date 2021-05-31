/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('ExtJSBoard.view.post.ReplyPost', {
	extend: 'Ext.form.Panel',
	xtype: 'replyPost',

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
		height: 700,
		name: 'cont',
		fieldLabel: '내용'
	}],
	fbar: [{
		xtype: 'button',
		text: '등록',
		handler: function(btn) {
			var title = btn.up('panel').down("component[name=title]").value;
			console.log(btn.up('panel').down("component[name=cont]"));
			var cont = btn.up('panel').down("component[name=cont]").value;


			Ext.Ajax.request({
				url: 'http://localhost/board/insertReply',
				method: 'POST',
				params: {
					board_no: board_no,
					pre_post_no: pre_post_no,
					title: title,
					cont: cont
				},
				success: function(response) {
					var check = Ext.decode(response.responseText).insertCnt;
					console.log("check", check);
					if (check == 1) {
						alert("게시글이 생성되었습니다.");
						//								btn.up("window").close();
						//								Ext.widget("main");
						post_no = Ext.decode(response.responseText).max_post_no;
						var page = btn.up("viewport").down("component[region=center]");
						page.removeAll(true);
						page.add(Ext.apply({
							xtype: 'postView'
						}));
					} else {
						alert("게시글 생성오류");
					}
				},
				failure: function(response) {
					console.log(response);
				}
			});

		}
	}]


});
