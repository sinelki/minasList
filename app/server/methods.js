Meteor.methods({
  deleteProfile: function () {
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Profiles.remove({owner: Meteor.userId});
  },
  updateProfile: function (profile) {
    if (! Meteor.userId() || (Meteor.userId()!==profile.owner)) {
      throw new Meteor.Error('not-authorized');
    }
  console.log('hello');
    if (Profiles.findOne({owner: Meteor.userId()})){
      Profiles.update(
        {owner: Meteor.userId()},
        {$set:{
          name:profile.name,
          country:profile.country,
          city:profile.city,
          description:profile.description,
          posts:profile.posts,
    owner: Meteor.userId(),
    buttonID:profile.buttonID
        }}
      );
    } else {
      profile.owner=Meteor.userId();
  console.log(profile.owner, profile)
      Profiles.insert(profile);
    }
  console.log(Profiles.findOne({name:profile.name}));
  },
  addUser: function(u) {
    if (! Meteor.userId() || Meteor.user().username!=='admin') {
      throw new Meteor.Error('not-authorized');
    }
    var userId = Accounts.createUser({email: u.email});
    Accounts.sendEnrollmentEmail(userId);
    console.log('print accounts');
  },
  tryResetPassword: function(email){
    Accounts.sendResetPasswordEmail(Meteor.users.findOne({'emails.address':email}));
  }
});


Meteor.users.allow({
  remove: function (userId, doc) {
  //currentUser = Meteor.users.findOne({ _id: userId }
  //console.log(currentUser);
    var u = Meteor.users.findOne({_id:userId});
    return (u && Meteor.user().username==='admin');

    //if (Meteor.user().username==='admin') {
	//console.log("green light");
      //return true;
    //} else {
      //console.log("red light");
      //return false;
    //}
  },
  fetch: []
});

