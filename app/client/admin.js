if (Meteor.isClient) {
    // Creates new user upon submission of form
    Template.adminOfProfiles.events({
    'submit form': function(event){
      event.preventDefault();
      var emailVar = event.target.username.value;
      Meteor.call("addUser",{email: emailVar});
     },
    // Sets selectedCandidate when an email is clicked
    'click .candidate': function(){
        var candidateId = this._id;
        Session.set('selectedCandidate', candidateId);
	console.log(candidateId);
    },
    // Removes user when remove button is clicked. Should also remove their profile (this does not work correctly)
    'click .remove': function (event) {
      var selectedCandidate = Session.get('selectedCandidate');
	console.log(selectedCandidate);
      var profileId = Profiles.findOne({owner:selectedCandidate});
	console.log(profileId);
      Profiles.remove(profileId);//Does NOT actually remove their profile from the database
	console.log(Profiles.find({}));
      Accounts.users.remove({ _id: selectedCandidate}, function (error, result) {
    if (error) {
      console.log("Error removing user: ", error);
    } else {
      console.log("Number of users removed: " + result);
     }
    })
   }
  });

    // Allows for loop in template to display all the users in the Accounts database
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

}
