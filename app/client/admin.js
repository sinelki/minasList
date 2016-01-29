if (Meteor.isClient) {
    Template.adminOfProfiles.events({
    'submit form': function(event){
      event.preventDefault();
      var emailVar = event.target.username.value;
      Meteor.call("addUser",{email: emailVar});
     },
    'click .candidate': function(){
        var candidateId = this._id;
        Session.set('selectedCandidate', candidateId);
	console.log(candidateId);
    },
    'click .remove': function (event) {
      var selectedCandidate = Session.get('selectedCandidate');
	console.log(selectedCandidate);
      var profileId = Profiles.findOne({owner:selectedCandidate});
	console.log(profileId);
      Profiles.remove(profileId);
	console.log(Profiles.find({}));
      Accounts.users.remove({ _id: selectedCandidate}, function (error, result) {
    if (error) {
      console.log("Error removing user: ", error);
    } else {
      console.log("Number of users removed: " + result);
     }
      //Accounts.update();
    })
   }
  });


    Template.adminOfProfiles.helpers({
	users: function(){
	console.log(Meteor.userId);
	  var user = Meteor.users.find();
	  console.log(user);
	  
	  return user;
	},
	'selectedClass': function(){
    	  var candidateId = this._id;
          var selectedCandidate = Session.get('selectedCandidate');
          if(candidateId == selectedCandidate){
        	return "selected"
          }
	}
  });

    //Template.adminOfProfiles.events ="click .data-cell": (e) ->Session.set("selectedCandidate", @_id)

    //Template.adminOfProfiles.selected = ->if Session.equals("selectedCandidate", @_id) then "selected" else ""

}
