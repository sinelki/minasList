Profiles = new Mongo.Collection('Profiles');

var userId=Meteor.users.findOne({"emails.address": 'user@gmail.com'});

//console.log(Meteor.users.find({}));

console.log(userId);


if( userId === undefined){
  Accounts.createUser({
    email: 'user@gmail.com',
    password: 'pass'
  });
}

var userId=Meteor.users.findOne({"emails.address": 'admin@gmail.com'});

//console.log(Meteor.users.find({}));

console.log(userId);


if( userId === undefined){
  Accounts.createUser({
    user: 'admin',
    email: 'admin@gmail.com',
    password: 'pass'
  });
}

var userId=Meteor.users.findOne({username: 'user'});

Profiles.schema = new SimpleSchema({
  name: {type: String},
  date: {type: Date},
  country: {type: String},
  city: {type: String},
  description: {type: String},
  posts: {type: [String]},
  owner: {type: String},
  buttonID: {type: String}
});

Profiles.attachSchema(Profiles.schema);


Profiles.attachSchema(Profiles.schema);

var profile = Profiles.findOne({name: 'Shinkai Karokhail'});

if(!profile){
  Profiles.insert({name: 'Shinkai Karokhail', date: new Date('December 17, 2015 03:24:00'), country: 'Afghanistan', city: 'Kabul', description:'I am a parliament member', posts:[], owner: userId.username, buttonID: '1234'});
  profile = Profiles.findOne({name: 'Shinkai Karokhail'});
}

console.log(profile);

var latest={createdAt: -1};

Meteor.publish('Profiles', function(query) {
  return Profiles.find(query, {sort: latest, fields: {'_id':1, 'name':1, 'date':1, 'country':1, 'description':1}});
});

Meteor.publish('Profile', function(id){
  return Profiles.find({owner:id});
})
