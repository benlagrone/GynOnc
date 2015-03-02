
Ext.define('myMDAnderson.controller.site.MainController', {
   extend: 'Ext.app.Controller',

	config : {
	id:'maincontroller',
		refs : {
			phone : '#phone',
			site:'#site',
			menulst:'#menulst',
			btnmenu:'#btnmenu',
			partlst:'#partlst',
			symptomlistView:'symptomlistView',
			contentviewsite:'#contentviewsite',
			btnpart2:'#btnpart2',
			btnpart1:'#btnpart1'
		},
		control : {
			partlst : {
				
				itemtap : "onItemTap",
			},
			phone:{
			initialize:'initializePhone',
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
			},
			'button[action=onclickSubmitBtn]' : {
				tap : 'onclickSubmitBtn'
			},
			btnpart1:{
			tap:'onbtnpart1click'
			},
			btnpart2:{
			tap:'onbtnpart2click'
			}
	},

	
	},
	//Part1 section action
	onbtnpart1click:function(){
		var partstore=Ext.getStore('partStore');
		Ext.getCmp('lblHeader').setHtml(partstore.getData().getAt(0).get('qstn'));
		Ext.getCmp('lblDetail').setHtml(partstore.getData().getAt(0).get('detail'));
		index=0;
		Ext.getCmp('partsitelst').setStore(partstore.getData().getAt(0).formStore);

	
	},
	
	//Part2 section action
	onbtnpart2click:function(){
	var partstore=Ext.getStore('partStore');
	Ext.getCmp('lblHeader').setHtml(partstore.getData().getAt(1).get('qstn'));
	Ext.getCmp('lblDetail').setHtml(partstore.getData().getAt(1).get('detail'));
	index=0;
	Ext.getCmp('partsitelst').setStore(partstore.getData().getAt(1).formStore);

	
	},
	
	//Submit the json request to server 
	onclickSubmitBtn : function(){
		 var jsonrequest= JSON.stringify(sample);
		 alert(jsonrequest);

		 Ext.Ajax.request({
                             url: 'http://localhost:8080/',
                             method:'POST', 
							 headers: {
								'Content-Type': 'application/json'
								},
							 params: Ext.JSON.encode(jsonrequest),
                           });

	 },
	 
	 //Function: initializeMenu 
	 //explanation: This function set the hamburger menu to right 
	initializeMenu:function(){
	
                        	
           Ext.Viewport.setMenu(this.menuForSide(),{
                                side: 'right',
                                reveal: true
                                });
	},
	
	
	//Function:menuitemtap 
	// explanation: hamburger menu item tap
	menuitemtap:function(dataview, index, target, record, e, eOpts){
												this.listitemtap(record);

			},
			
			
	//Function:initializeSite 
	// explanation: hamburger menu item tap
	initializeSite:function(){
	 var me = this;
	Ext.Ajax.request({
                                        url: 'resources/config/Part.json',
                                        method:'GET', 
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
									success: function (response, request) { 
										var res = eval("(" + response.responseText + ")");
										var partstore=Ext.getStore('partStore');
										 partstore.setData(res);
										 partstore.load();
										 index=0;
	                        	    	Ext.getCmp('partsitelst').setStore(partstore.getData().getAt(0).formStore);
										Ext.getCmp('btnpart1').setText(partstore.getData().getAt(0).get('title'));
										Ext.getCmp('btnpart2').setText(partstore.getData().getAt(1).get('title'));
										Ext.getCmp('lblHeader').setHtml(partstore.getData().getAt(0).get('qstn'));
										Ext.getCmp('lblDetail').setHtml(partstore.getData().getAt(0).get('detail'));
										Ext.getCmp('btnpart1').setText(partstore.getData().getAt(0).get('title'));



										},
																					failure: function (response, request) {
										console.log('Response Status:- '+response.status)
										}                                });   

                        	 var menustore=Ext.getStore('menuStore');
                        	menustore.load({
            callback: function(data) { 
            
              menustore.data.each(function () {
					var btn = new Ext.create('Ext.Button', {
					text: this.get('title'),
					ui:'plain',
					handler:function(btn,e){
									if(btn.config.text!="Home"){

					Ext.Viewport.setActiveItem('contentviewsite',{type: 'slide', direction: 'right'});

					var heightval=Ext.Viewport.getWindowHeight();
								
				var widthval=Ext.Viewport.getWindowHeight();
				Ext.getCmp('urlPanel').setHeight(heightval);
				Ext.getCmp('urlPanel').setHeight(widthval);
				if(btn.config.text=="FAQ"){
				Ext.getCmp('urlPanel').setHtml('<iframe height="'+heightval+'" width="100%" src="https://my.mdanderson.org/faq/""></iframe>');
				}
				else if(btn.config.text=="Contact Us"){
				Ext.getCmp('urlPanel').setHtml('<iframe height="'+heightval+'" width="100%" src="https://my.mdanderson.org/content/index.cfm?pld=000DD18D-1032-1BE3-891A8302A07301D1"></iframe>');

					}
					else if(btn.config.text=="Help"){
				Ext.getCmp('urlPanel').setHtml('<iframe height="'+heightval+'" width="100%" src="https://my.mdanderson.org/content/display.cfm?id=979C8ED1-0FBA-4E55-65C998E89A8A0835"></iframe>');

					}
					}
					else{
					me.viewSlide();
					}
					}
					});
								Ext.getCmp('sitetitle').add(btn);

				});
				
				}
             });    
  	
	},
	
	
	//Funciton:initializePhone
	//explanation:Intialize mobile view
	initializePhone: function(){  
           var menustore=Ext.getStore('menuStore');
                        	menustore.load();
                        	Ext.Ajax.request({
                                        url: 'resources/config/Part.json',
                                        method:'GET', 
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
									success: function (response, request) { 
										console.log('Response:-');
										var res = eval("(" + response.responseText + ")");
										var partstore=Ext.getStore('partStore');
	                        	 partstore.setData(res);
	                        	 partstore.load();
	                        	 index=0;
										},
																					failure: function (response, request) {
										console.log('Response Status:- '+response.status)
										}                                });   

                        	
           Ext.Viewport.setMenu(this.menuForSide(),{
                                side: 'right',
                                reveal: true
                                });
                                Ext.getCmp('bckbtnid').hide();
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
     
     //Function:onItemTap
     //Explanation: itemtap functionality of list in mobile
	onItemTap:function(dataview, index, target, record, e, eOpts){
				
         Ext.getCmp('partlst').setActiveItem('symptomlistView');
         Ext.getCmp('symptomlistView').show();
        			Ext.getCmp('symptomlst').setStore(record.formStore);
 					index=0;
                    Ext.getCmp('bckbtnid').show();
              
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
