/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('ExtJSBoard.Application', {
    extend: 'Ext.app.Application',
	
	xtype : 'ExtJSBoard',
	id : 'ExtJSBoard',
    name: 'ExtJSBoard',
	
    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
	
	launch : function(){
		Ext.Ajax.request({
			url : '/board/sessionCheck',
			method : 'post',
			success : function(res){
				
				var loginCheck = Ext.decode(res.responseText).S_USER;
				
				console.log("loginCheck" ,loginCheck);
				if(loginCheck == null){
					Ext.widget("login");
				}else{
					if(loginCheck.admin_code==1){
						Ext.widget("adminMain");
					}else{
						Ext.widget("main");
					}
				}
				
			}
		})
		
		
		//둘중 하나 사용
//		Ext.widget("login");
//		Ext.create("ExtJSBoard.view.login.Login");
	},
	
    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
