Meteor.methods({
  deleteProfile: function () {
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Profiles.remove({owner: Meteor.userId});
  },
  updateProfile: function (profile) {
    /*if (! Meteor.userId() || (Meteor.userId()!==profile.owner)) {
      throw new Meteor.Error('not-authorized');
    }*/
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
    Accounts.createUser({
      email: u.email,
      password: u.password
    });
    console.log('print accounts');
    console.log(Meteor.users.findOne({username:u.user}));
  },
  tryResetPassword: function(email){
    Accounts.sendResetPasswordEmail(Meteor.users.findOne({'emails.address':email}));
  },
  trySetPassword: function(token,newPassword){
    Accounts.resetPassword(token, newPassword);
  }
});
