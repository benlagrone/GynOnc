Ext.define('myMDAnderson.profile.Site', {
  extend: 'Ext.app.Profile',

  config: {
          name: 'Site',

    controllers: ['MainController'],
    views: ['Main','ContentViewSite']
  },

  isActive: function() {
           return Ext.os.is.Tablet || Ext.os.is.Desktop;
  },

  launch: function() {
    window.addEventListener('resize', resizeWindowSize);
   resizeWindowSize();
  }
  
});
function resizeWindowSize() {
  if (window.innerWidth >500) {
var siteid=Ext.getCmp('site');
			if(siteid){
            		Ext.Viewport.setActiveItem(siteid);
            }
            else{
                        Ext.Viewport.add(Ext.create('myMDAnderson.view.site.Main'));

            }

  } else {
var phoneid=Ext.getCmp('phone');
			if(phoneid){
            Ext.Viewport.setActiveItem(phoneid);
            }
            else{
              Ext.Viewport.add(Ext.create('myMDAnderson.view.phone.Main'));

            }

  }
}
