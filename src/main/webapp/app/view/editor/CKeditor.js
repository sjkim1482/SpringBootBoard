Ext.define("ExtJSBoard.view.editor.CKeditor",{
    extend:"Ext.form.field.TextArea",
    alias:'widget.ckeditor',
    xtype : 'ckeditor',
    ckEditorInstance : null,

    initComponent: function() {
       ExtJSBoard.view.editor.CKeditor.superclass.initComponent.call(this, arguments);

        this.addEvents(
            /**
         * @event save
         * Fired when saving contents.
         * @param {ExtJSBoard.view.editor.CKeditor} cKeditor This object
         * @param (contents) contents needing to be saved
         */
            'save'
            );
    },

    constructor : function(config){
        config = Ext.apply({
            grow:true,
            hideLabel:true
        },config);
       ExtJSBoard.view.editor.CKeditor.superclass.constructor.call(this, config);
    },

    onRender : function(ct, position){
        ExtJSBoard.view.editor.CKeditor.superclass.onRender.call(this, ct, position);
        this.setupCkEditor();
        //this.on('resize', this.textAreaResized, this);
    },

    setupCkEditor : function(){
        var editor = CKEDITOR.replace(this.inputEl.id, {
        	resize_enabled:false,
        	skin:'office2003'
        });
        
        console.debug(editor);        
        
        editor.extjsPanel = this;
        this.ckEditorInstance = editor;
        this.setValue(this.defaultValue);
    },

    textAreaResized : function(textarea, adjWidth, adjHeight){

        if(!this.ckEditorInstance)
        {
            if(!adjWidth && !adjHeight){
                var el = document.getElementById('cke_contents_' + this.inputEl.id);
                
                if(!(el)){
                    var toolBoxDiv = document.getElementById('cke_top_' + this.inputEl.id).getElementsByTagName('div')[0];
                    var toolBoxEl = Ext.get(toolBoxDiv);
                    var displayValue = toolBoxEl.getStyle('display');
                    if(displayValue != 'none'){
                        this.ckEditorInstance.execCommand( 'toolbarCollapse' );
                        el.style.height = adjHeight - 51 + 'px';
                        this.ckEditorInstance.execCommand( 'toolbarCollapse' );
                    }
                    else{
                        el.style.height = adjHeight - 51 + 'px';
                    }
					
                }
                else{
                    this.ckEditorInstance.config.height = adjHeight - 51;
                }
            }
        }
    },

    setValue : function(value){
        if(this.ckEditorInstance){
            this.ckEditorInstance.setData(value);
        }
        else{
            this.defaultValue = value;
        }
            
    },

    getValue : function(){
        if(this.ckEditorInstance)
            var value = this.ckEditorInstance.getData();
        return value;
    },

    getRawValue : function(){
        if(this.ckEditorInstance)
            var value = this.ckEditorInstance.getData();
        return value;
    },

    insertHtml : function(html){
        this.ckEditorInstance.insertHtml(html);
    }
});
