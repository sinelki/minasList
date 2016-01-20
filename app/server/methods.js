Meteor.methods({
  addProfile: function (profile) {
    // Make sure the user is logged in before inserting a task
  /*  if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    } */
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
