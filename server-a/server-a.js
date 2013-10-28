Items = new Meteor.Collection('items');

Items.allow({
  insert: function() {
    return true;
  }
});

Items.find().observe({
  added: function(item) {
    console.log(item);
  }
})

if (Meteor.isClient) {
  Template.test.events({
    'click a': function (e) {
      e.preventDefault();
      Items.insert({ test: new Date() });
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish('remote-items', function() {
    return Items.find();
  })
}
