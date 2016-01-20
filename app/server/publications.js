Profiles = new Mongo.Collection('Profiles');

Profiles.schema = new SimpleSchema({
  name: {type: String},
  date: {type: Date},
  country: {type: String},
  description: {type: String},
  posts: {type: [Object]}
});

Profiles.attachSchema(Profiles.schema);

var profile = Profiles.findOne({name: 'Shinkai Karokhail'});

if(!profile){
  Profiles.insert({name: 'Shinkai Karokhail', date: new Date('December 17, 2015 03:24:00'), country: 'Afghanistan', description:'I am a parliament member', posts:[]});
  profile = Profiles.findOne({name: 'Shinkai Karokhail'});
}

console.log(profile);

var latest={createdAt: -1};

Meteor.publish('Profiles', function(query) {
  return Profiles.find(query, {sort: latest, fields: {'_id':1, 'name':1, 'date':1, 'country':1, 'description':1}});
});

Meteor.publish('Profile', function(id){
  return Profiles.find({_id:id});
})


Meteor.methods({
  addProfile: function (profile) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    profile.owner=Meteor.userId();
    Profiles.insert(profile);
  },
  deleteProfile: function () {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Profiles.remove({owner: Meteor.userId});
  },
  editProfile: function (profile) {
    if (! Meteor.userId() || (Meteor.userId()!==profile.owner)) {
      throw new Meteor.Error("not-authorized");
    }
    Profiles.update({owner: Meteor.userId},{$addToSet: {name:profile.name,country:profile.country,description:profile.description,posts:profile.posts}});
  }
});
