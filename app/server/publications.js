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

console.log(profile)

Meteor.publish('Profiles', function() {
  return Profiles;
});
