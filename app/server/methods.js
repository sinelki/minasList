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
        {$set:{
          name:profile.name,
          country:profile.country,
          city:profile.city,
          description:profile.description,
          posts:profile.posts,
	  owner: Meteor.userId()
        }}
      );
    } else {
      profile.owner=Meteor.userId();
	console.log(profile.owner, profile)
      Profiles.insert(profile);
    }
	console.log(Profiles.find({}));
  }
});
