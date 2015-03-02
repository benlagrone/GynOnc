
var sample = new Array();
var index = 0;

Ext.define('myMDAnderson.view.site.Main', {
    extend: 'Ext.Panel',
     alias:'widget.site' ,
    config: {

        id:'site',
         cls:'mainBG',  
         items:[{
                    xtype: 'titlebar',
                    ui:'plain',
                    cls:'titlebarcls',
                    id:'sitetitle',
                    titleAlign :'right',
                    title: '<html><div class="left"><b class="tilemy">my</b><b>MD Anderson</div></html>',
                	
                },{
         xtype:'container', 
         id:'switchcontent',
         height:'80%',    
		items: [
                {
                xtype:'label',
                cls:'topicheader',
                text:'64869'
                },
                {
                xtype:'label',
                cls:'topicheader',
                html:'<div style="margin:5px;">M.D. Anderson Symptom Inventory - Heart Failure ( MDASI - HF )<div>'
                },
                {
                xtype:'container',
                layout:'hbox',
                cls:'hboxcls',
                items:[
                {
                xtype:'label',
                height:'10%',
                cls:'detailheader',
                html:'Subject\'s Initials:'
                },
                {
                xtype:'textfield',
                cls:'textheader',
                useClearIcon: false,
                height:2,
                },
                
                {
                xtype:'button',
                align:'right',
                cls:'btnsubmit',
                text:'Submit',
                //ui:'plain',
                docked: 'right',
                action:'onclickSubmitBtn'
                },
                {
                xtype:'label',
                cls:'dateheader',
                value: getDate(),
                html:getDate(),
                docked: 'right' 
                },
                
                ]
                },
                {
                xtype:'spacer',
                height:'3%'
                },
                {
                xtype:'container',
                layout:'hbox',
                cls:'hboxcls',
                items:[
                {
                xtype:'label',
                height:'10%',
                cls:'detailheader',
                html:'Study Subject:'
                },
                {
                xtype:'textfield',
                cls:'textheadersub',
                useClearIcon: false,
                height:1,
                },
                
                ]},
                 {
                 xtype:'container',
                 layout:'hbox',
                 //ui:'plain',
                 cls:'btncontianer',
                 items:[
                 {
                 xtype:'button',
                 flex:1,
                 id:'btnpart1',
                 cls:'btnpart',
                 pressed : true,
                 pressedCls:'pressedcls'
                 },
                 {
                 xtype:'button',
                 flex:1,
                 pressed : false,
                 id:'btnpart2',
                 cls:'btnpart',
                 pressedCls:'pressedcls'
                 },
                 ]},
                 {
                 xtype:'label',
                 id:'lblHeader',
                 cls:'detailheader',
                 margin:5,
                 },
                 {
                 xtype:'label',
                 id:'lblDetail',
                 cls:'detailheader',
				 margin:5,
                 },
                 {     
                                    	 xtype: 'list',
                                         id:'partsitelst',
                                         width: '100%',
           								 height: '73%',
           								 margin:2,
           								
           								 cls:'lstsite',  
                                         disableSelection:true,
                                         itemTpl: ['<div>{[ this.getIndex() ]}. {symptom}<br><br><div>',
												'<input type="radio" id="optn" name={[ this.getIndex1() ]} value="1"></n> 1 ',
												'<input type="radio" id="optn" name={[ this.getIndex2() ]} value="2"> 2 ',
												'<input type="radio" id="optn" name={[ this.getIndex3() ]} value="3"> 3 ',
												'<input type="radio" id="optn" name={[ this.getIndex4()]} value="4"> 4 ',
												'<input type="radio" id="optn" name={[ this.getIndex5()]} value="5"> 5 ',
												'<input type="radio" id="optn" name={[ this.getIndex6() ]} value="6"> 6 ',
												'<input type="radio" id="optn" name={[ this.getIndex7() ]} value="7"> 7 ',
												'<input type="radio" id="optn" name={[ this.getIndex8() ]} value="8"> 8 ',
												'<input type="radio" id="optn" name={[ this.getIndex9() ]} value="9"> 9 ',
												'<input type="radio" id="optn" name={[ this.getIndex10() ]} value="10"> 10 ',
												'</div><br><br><br><br></div>',
												{
																 index1 : 0,index2 : 0,index3 : 0,index4 : 0,index5 : 0,index6 : 0,index7 : 0,index8 : 0,index9 : 0,index10 : 0,
										
																	getIndex : function(){
																		 index = index + 1;
																		 return index;
																	},
																	getIndex1 : function(){
																		 this.index1 = this.index1 + 1;
																		 return this.index1;
																	},
																	getIndex2 : function(){
																		 this.index2 = this.index2 + 1;
																		 return this.index2;
																	},
																	getIndex3 : function(){
																		 this.index3 = this.index3 + 1;
																		 return this.index3;
																	},
																	getIndex4 : function(){
																		 this.index4 = this.index4 + 1;
																		 return this.index4;
																	},
																	getIndex5 : function(){
																		 this.index5 = this.index5 + 1;
																		 return this.index5;
																	},
																	getIndex6 : function(){
																		 this.index6 = this.index6 + 1;
																		 return this.index6;
																	},
																	getIndex7 : function(){
																		 this.index7 = this.index7 + 1;
																		 return this.index7;
																	},
																	getIndex8 : function(){
																		 this.index8 = this.index8 + 1;
																		 return this.index8;
																	},
																	getIndex9 : function(){
																		 this.index9 = this.index9 + 1;
																		 return this.index9;
																	},
																	getIndex10 : function(){
																		 this.index10 = this.index10 + 1;
																		 return this.index10;
																	}
											
																 }],
																  listeners : {
																		itemtap: function (list, index, item, record, senchaEvent) {
													
																				setTimeout(function(){	
		
																		var m =""+(index+1);
	
																			var radios = document.getElementsByName(m);
	
																			for (var i = 0; i < radios.length; i++) {  
																		//alert(radios[i].value+"   "+radios[i].checked);	
																				if (radios[i].checked) {
																				   // alert(rec[i].value);
																					found = 0;
																					   var jsonObject ={
																						"symptom":""+record.get('symptom'),
																						"value":""+radios[i].value
																						}
																					sample.push(jsonObject);
																					break;
																				}
																			}
		
																				},1000);
																  }}
										 
										 
                                         },
                                         
							],
                
                
            },]}
         
});
