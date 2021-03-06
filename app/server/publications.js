Profiles = new Mongo.Collection('Profiles');
// get user ID from email
var userId=Meteor.users.findOne({"emails.address": 'user@gmail.com'});

//console.log(Meteor.users.find({}));

console.log(userId);

// create a new user if the email isn't already in the database
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
    username: 'admin',
    email: 'admin@gmail.com',
    password: 'pass'
  });
}

var userId=Meteor.users.findOne({"emails.address": 'user@gmail.com'})._id;

console.log

// set up schema of information pieces that go into a single profile for Profiles database
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

// set up exmaple profile
var profile = Profiles.findOne({name: 'Shinkai Karokhail'});

if(!profile){
  Profiles.insert({name: 'Shinkai Karokhail', date: new Date('December 17, 2015 03:24:00'), country: 'Afghanistan', city: 'Kabul', description:'I am a parliament member', posts:[], owner: userId, buttonID: '1234'});
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

Meteor.publish("allUsers", function () {
console.log(Meteor.users.findOne({_id:this.userId}));
  if (Meteor.users.findOne({_id:this.userId}).username!=='admin') {
    throw new Meteor.Error('not-authorized');
  }

  return Meteor.users.find();
});


Profiles.allow({
    remove: function () { return true; },
});
