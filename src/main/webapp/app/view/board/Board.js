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
	title: '게시판 관리',
	items: [{
		xtype: 'panel',
		html: '<h1>게시판 생성</h1>'
	}, {
		xtype: 'panel'
		, layout: 'table'
		, layoutConfig: {
			columns: 2
		}
		, anchor: '100%'
		, defaults: {
			border: true
			, style: {
				marginTop: '5px'
				, paddingRight: '10px'
			}
		},
		items: [{
			xtype: 'textfield',
			name: 'board_nm'
		}, {
			xtype: 'combo',
			width: 100,
			displayField: 'key',
			valueFiled: 'value',
			name: 'check_on',
			value: '활성',
			store: {
				fields: ['key', 'value'],
				data: [{
					key: '활성',
					value: '1'
				}, {
					key: '비활성',
					value: '0'
				}]
			}
		}, {
			xtype: 'button',
			text: '생성',
			handler: function(btn) {
				var board_nm = btn.up('panel').down("component[name=board_nm]").value;
				console.log(btn.up('panel').down("component[name=check_on]"));
				var check = btn.up('panel').down("component[name=check_on]").value;
				var check_on = 0;
				if (check == "활성") {
					check_on = 1;
				}


				Ext.Ajax.request({
					url: '/board/insertBoard',
					method: 'POST',
					params: {
						board_nm: board_nm,
						check_on: check_on
					},
					success: function(response) {
						var check = Ext.decode(response.responseText).insertCnt;
						console.log("check", check);
						if (check == 1) {
							alert("게시판이 생성되었습니다.");

						} else {
							alert("게시판 생성오류");
						}

					},
					failure: function(response) {
						console.log(response);
					}
				});

			}
		}]

	},{
		xtype : 'panel',
		html : '<h1>게시판 목록</h1>'
	},{
		xtype : 'panel',
		listeners : {
			boxready : function(obj){
				Ext.Ajax.request({
					url : '/board/boardListView',
					method : 'GET',
					success : function(response){
						var boardList = Ext.decode(response.responseText).boardList;
						console.log("boardList",boardList);
						var page = obj.up("viewport").down("component[region=center]");
						
						for(idx in boardList){
							var status = '비활성';
							if(boardList[idx].check_on == 1){
								status = '활성';	
							}
							page.add(Ext.apply({
								xtype: 'panel', 
								layout: 'table', 
								name : "boardPanel",

								items: [{
									xtype: 'panel',
									width : 150,
									name: 'board_nm',
									html : "<h3>"+boardList[idx].board_nm+"</h3>"
								}, {
									xtype: 'combo',
									width: 100,
									displayField: 'key',
									valueFiled: 'value',
									name: 'check_on',
									value : status,
									store: {
										fields: ['key', 'value'],
										data: [{
											key: '활성',
											value: '1'
										}, {
											key: '비활성',
											value: '0'
										}]
									}
								}, {
									xtype: 'button',
									text: '적용',
									value : boardList[idx].board_no,
									handler: function(btn) {
										
										board_no = btn.value;
										var check = btn.up('component[name=boardPanel]').down("component[name=check_on]").value;
										console.log("활성, 비활성 여부",check);
										var check_on = 0;
										if (check == "활성") {
											check_on = 1;
										}
						
						
										Ext.Ajax.request({
											url: '/board/updateBoard',
											method: 'POST',
											params: {
												board_no : board_no,
												check_on : check_on
											},
											success: function(response) {
												var updateCnt = Ext.decode(response.responseText).updateCnt;
												console.log("check", check);
												if (updateCnt == 1) {
													alert("변경 되었습니다.");
												} else {
													alert("오류발생");
												}

											},
											failure: function(response) {
												console.log(response);
											}
										});
						
									}
								}]
							}))
							
						}
						
					},
					failure : function(response){
						console.log(response);
					}
				});
			}
		}
	}]

});
