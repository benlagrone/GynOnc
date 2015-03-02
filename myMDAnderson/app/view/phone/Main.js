var sample = new Array();

Ext.define('myMDAnderson.view.phone.Main', {
    extend: 'Ext.Panel',
     requires: [
        'Ext.Menu',
        'myMDAnderson.view.phone.SymptomListView',

    ],
       alias:'widget.phone' ,

    config: {
     
            id:'phone',
      cls:'mainBG',
      
		items: [{
                    xtype: 'titlebar',
                    ui:'plain',
                    titleAlign :'right',
                    title: '<html><div class="left"><b class="tilemy">my</b><b>MDAnderson</div></html>',
                	items:[{
                    xtype:'button',
                    ui:'plain',
                    align:'right',
                    id:'btnmenu',
                     text: '<img height=30px src="resources/images/nav/burgermenu.png" />',
                           
                    },{xtype:'button',
                    ui:'back',
                    id:'bckbtnid',
                    align:'left',
                    text:'back',
                    hidden:'yes',
                    handler: function(){
                    
                    Ext.getCmp('symptomlistView').hide();
                    Ext.getCmp('bckbtnid').hide();
                    
                    index=0;
                    }}]
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
                }]},
                {
                xtype:'container',
                layout:'hbox',
                cls:'hboxcls',
                items:[
                {
                xtype:'button',
                align:'right',
                cls:'btnsubmit',
                text:'Submit',
                //ui:'plain',
                action:'onclickSubmitBtn',
                docked: 'right' 
                },
                {
                xtype:'label',
                cls:'dateheader',
                value: getDate(),
                html:getDate(),
                //docked: 'right' 
                },
                
                ]
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
                cls:'textheader',
                useClearIcon: false,
                height:2,
                },
                
                ]},
                      
                                    {     xtype: 'list',
                                         id:'partlst',
                                         width: '100%',
           								 height: '71%',
           								 margin:2,
           								 cls:'lstsite',
                                         store:'partStore',
                                          itemCls:'lstsite',
                                         itemTpl:'<div class="lstsite"><b>{title}</b>.{qstn}<br><br><br>{detail}</div>',
                                        
                                 
                                        }
                                        
                                        
                                         
                                         
                                        
                                         
                                         ],
                
            },
            
             
          
           
});
