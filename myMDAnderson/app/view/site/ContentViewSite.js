Ext.define('myMDAnderson.view.site.ContentViewSite', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.Menu',

    ],
    alias:'widget.contentviewsite' ,
    config: { 
    id:'contentviewsite', 
    cls:'mainBG',    
		items: [
		
                  {  xtype: 'titlebar',
                    ui:'plain',
                    titleAlign :'right',
                    title: '<html><div class="left"><b class="tilemy">my</b><b>MD Anderson</div></html>',
                    items:[{
                    
                    xtype:'button',
                    ui:'plain',
                    align:'left',
                    text:'back',
                    handler: function(){
                    Ext.Viewport.setActiveItem('site',{type: 'slide', direction: 'right'});
                    
                    }}]
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
