Meteor.methods({
  deleteProfile: function () {
  	// function to delete user profile IFF the user has an account already in the Profiles database
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Profiles.remove({owner: Meteor.userId});
  },
  updateProfile: function (profile) {
  	// function to update user profile IFF the user has an account already in the Profiles database
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
  console.log('hello');
  	// update the profile using the new information
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
  	// add a new user to the Accounts database IFF the person logged in is the admin
    if (! Meteor.userId() || Meteor.user().username!=='admin') {
      throw new Meteor.Error('not-authorized');
    }
    var userId = Accounts.createUser({email: u.email});
    Accounts.sendEnrollmentEmail(userId);
    console.log('print accounts');
  },
  tryResetPassword: function(email){
  	// send an email to the user whose password was reset
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

