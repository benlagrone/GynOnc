Ext.define('myMDAnderson.view.phone.SymptomListView', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.Menu',

    ],
    alias:'widget.symptomlistView' ,
    config: { 
    id:'symptomlistView', 
     cls:'mainBG',   
		items: [
                
               {     
                                    	 xtype: 'list',
                                         id:'symptomlst',
                                         width: '100%',
           								 height: '98%',
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
                },        
});
