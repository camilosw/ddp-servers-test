Items = new Meteor.Collection('items');

Items.find().observe({
  added: function(item) {
    console.log('-- local item --');
    console.log(item);
  }
})

if (Meteor.isServer) {
  var remote = DDP.connect('http://ddpserverstest-9592.onmodulus.net/');
  var ServerAItems = new Meteor.Collection('items', { connection: remote });

  Meteor.startup(function() {
    Items.remove({});
    remote.subscribe('remote-items');
  });
  ServerAItems.find().observe({
    added: function(item) {
      console.log('-- remote item --');
      console.log(item);
      Items.insert(item);
    }
  });
}
