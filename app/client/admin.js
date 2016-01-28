if (Meteor.isClient) {
    Template.adminOfProfiles.events({
    'submit form': function(event){
      event.preventDefault();
      var nameVar = event.target.name.value;
      var emailVar = event.target.username.value;
      var passwordVar = event.target.password.value;
      Meteor.call("addUser",{user: nameVar, email: emailVar, password: passwordVar});
     },
    'click .candidate': function(){
        var candidateId = this._id;
        Session.set('selectedCandidate', candidateId);
	console.log(candidateId);
    },
    'click .remove': function (event) {
      var selectedCandidate = Session.get('selectedCandidate');
	console.log(selectedCandidate);
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
	  var user = Meteor.users.find();
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
