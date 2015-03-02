Ext.define('myMDAnderson.view.phone.ContentView', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.Menu',

    ],
    alias:'widget.contentview' ,
    config: { 
    id:'contentview', 
    cls:'mainBG',   
		items: [{
                    xtype: 'titlebar',
                    ui:'plain',
                    titleAlign :'right',
                    title: '<html><div class="left"><b class="tilemy">my</b><b>MDAnderson</div></html>',
                	items:[{
                    xtype:'button',
                    ui:'plain',
                    id:'btnmenu',
                    align:'right',
                     text: '<img height=30px src="resources/images/nav/burgermenu.png" />',
                           
                    },
                    {
                    xtype:'button',
                    ui:'back',
                    align:'left',
                    text:'back',
                    handler: function(){
                    Ext.Viewport.setActiveItem('phone',{type: 'slide', direction: 'right'});
                    }
                    }]
                },
                
               {     
                                    	 xtype: 'container',
                                         id:'urlPanel',
                                         
           								 margin:10,
           								 cls:'lstsite', 
           								  
                                         disableSelection:true,
                                     
											
                                         }
                           
                ],
                },
                
            
        
});
