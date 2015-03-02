
Ext.define('myMDAnderson.controller.phone.MainController', {
   extend: 'Ext.app.Controller',

	config : {
	id:'maincontroller',
		refs : {
			phone : '#phone',
			menulst:'#menulst',
			btnmenu:'#btnmenu',
			partlst:'#partlst',
			symptomlistView:'symptomlistView',
			
		},
		control : {
			partlst : {
				
				itemtap : "onItemTap",
			},
			phone:{
			initialize:'initializePhone'
			},
			site:{
			initialize:'initializeSite'
			},
			symptomlistView:{
						initialize:'initializeMenu'

			},
			menulst:{
				itemtap:'menuitemtap'
			},
			
			btnmenu:{
			tap:'viewSlide'
			}
	},

	
	},
	menuitemtap:function(dataview, index, target, record, e, eOpts){
												this.listitemtap(record);

			},
	
	initializePhone: function(){  
           var menustore=Ext.getStore('menuStore');
                        	menustore.load();
                        	var partstore=Ext.getStore('partStore');
                        	partstore.load();
                        	
           Ext.Viewport.setMenu(this.menuForSide(),{
                                side: 'right',
                                reveal: true
                                });
           },
           listitemtap:function(record){
     
								this.viewSlide();

				if(record.data.title=="FAQ"){
				Ext.Viewport.setActiveItem('contentview',{type: 'slide', direction: 'right'});
				var heightval=Ext.Viewport.getWindowHeight();
				var widthval=Ext.Viewport.getWindowHeight();
				Ext.getCmp('urlPanel').setHeight(heightval);
				Ext.getCmp('urlPanel').setHeight(widthval);
				Ext.getCmp('urlPanel').setHtml('<iframe height="'+heightval+'" width="100%" src="https://my.mdanderson.org/faq/""></iframe>');
				}
				else if(record.data.title=="Contact Us"){
				Ext.Viewport.setActiveItem('contentview',{type: 'slide', direction: 'right'});
				var heightval=Ext.Viewport.getWindowHeight();
				var widthval=Ext.Viewport.getWindowHeight();
				Ext.getCmp('urlPanel').setHeight(heightval);
				Ext.getCmp('urlPanel').setHeight(widthval);
				Ext.getCmp('urlPanel').setHtml('<iframe height="'+heightval+'" width="100%" src="https://my.mdanderson.org/content/index.cfm?pld=000DD18D-1032-1BE3-891A8302A07301D1"></iframe>');
				
				}
				else if(record.data.title=="Help"){
				Ext.Viewport.setActiveItem('contentview',{type: 'slide', direction: 'right'});
				var heightval=Ext.Viewport.getWindowHeight();
				var widthval=Ext.Viewport.getWindowHeight();
				Ext.getCmp('urlPanel').setHeight(heightval);
				Ext.getCmp('urlPanel').setHeight(widthval);
				Ext.getCmp('urlPanel').setHtml('<iframe height="'+heightval+'" width="100%" src="https://my.mdanderson.org/content/display.cfm?id=979C8ED1-0FBA-4E55-65C998E89A8A0835"></iframe>');
				
				}
     },
     viewSlide:function(){
     
     if(Ext.Viewport.getMenus().right.isHidden()){
                            Ext.Viewport.showMenu('right');
                            }
                           else
                           {

                            var menustore=Ext.getStore('menuStore');
                           
                            Ext.Viewport.hideMenu('right');
                            }
				Ext.Viewport.setActiveItem('phone',{type: 'slide', direction: 'right'});
     },
	onItemTap:function(dataview, index, target, record, e, eOpts){
				
                             
         Ext.Viewport.setActiveItem('symptomlistView');

        										Ext.getCmp('symptomlst').setData(record.data.form );

},
	             doSetHidden: function(hidden) {
        this.callParent(arguments);

        if (hidden) {
           
            Ext.Viewport.removeMenu('right');
        } else {
            Ext.Viewport.setMenu(this.menuForSide('right'), {
                         					cls:'mainBG',
                                             width: 250,
                side: 'right',
                reveal: true
            });
        }
    },

    menuForSide: function(side) {
    
        var items = [{
            xtype: 'list',
            id:'menulst',
            height:'100%',
            store: 'menuStore',
            itemTpl: '{title}',
            
            
        }];

        return Ext.create('Ext.Menu', {
                     					cls:'mainBG',

                                         width: 250,

            items: items
        });

     },
     
});
