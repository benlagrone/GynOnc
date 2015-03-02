Ext.define('myMDAnderson.profile.Phone', {
  extend: 'Ext.app.Profile',
        layout: 'card',

  config: {
          name: 'Phone',
    controllers: ['MainController'],
    views: ['Main','ContentView','SymptomListView'],
    
  },

  isActive: function() {
    return Ext.os.is.Phone;
  },

  launch: function() {
        Ext.Viewport.add(Ext.create('myMDAnderson.view.phone.Main'));

    
  }
});