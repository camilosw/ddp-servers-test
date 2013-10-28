Items = new Meteor.Collection('items');

Items.allow({
  insert: function() {
    return true;
  }
});

Meteor.methods({
  delete: function() {
    Items.remove({});
  }
});

Items.find().observe({
  added: function(item) {
    console.log(item);
  }
})

if (Meteor.isClient) {
  Template.test.events({
    'click a.insert': function (e) {
      e.preventDefault();
      Items.insert({ test: new Date() });
    },
    'click a.delete': function (e) {
      e.preventDefault();
      Meteor.call('delete');
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish('remote-items', function() {
    return Items.find();
  })
}
