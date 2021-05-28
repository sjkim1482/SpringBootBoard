/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'ExtJSBoard.Application',

    name: 'ExtJSBoard',

    requires: [
        // This will automatically load all classes in the ExtJSBoard namespace
        // so that application classes do not need to require each other.
        'ExtJSBoard.*'
    ]
	
    // The name of the initial view to create.
//    mainView: 'ExtJSBoard.view.main.Main'
});
