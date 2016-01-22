Meteor.methods({
  deleteProfile: function () {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Profiles.remove({owner: Meteor.userId});
  },
  updateProfile: function (profile) {
    /*if (! Meteor.userId() || (Meteor.userId()!==profile.owner)) {
      throw new Meteor.Error("not-authorized");
    }*/
    if (Profiles.findOne({owner: Meteor.userId()})){
      Profiles.update(
        {owner: Meteor.userId},
        {$addToSet:{
          name:profile.name,
          country:profile.country,
          city:profile.city,
          description:profile.description,
          posts:profile.posts
        }}
      );
    } else {
      profile.owner=Meteor.userId();
      Profiles.insert(profile);
    }
  }
});
