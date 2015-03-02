Ext.define('myMDAnderson.view.Main', {
    extend: 'Ext.Panel',
    
    config: {      
		items: [{
                    xtype: 'titlebar',
                    ui:'plain',
                    titleAlign :'right',
                    title: '<html><div class="left"><b class="tilemy">my</b><b>MD Anderson</div></html>',
                	items:[{
                    xtype:'button',
                    ui:'plain',
                    align:'right',
                     text: '<img height=30px src="resources/images/nav/burgermenu.png" />',

                    }]
                }],
                
            },
        
});
