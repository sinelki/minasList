if (Meteor.isClient) {
    Template.adminOfProfiles.events({
    'submit form': function(event){
      event.preventDefault();
      var nameVar = event.target.name.value;
      var emailVar = event.target.username.value;
      var passwordVar = event.target.password.value;
      Meteor.call("addUser",{user: nameVar, email: emailVar, password: passwordVar});
	console.log(Accounts.find({}));
    }
	
  });

    Template.adminOfProfiles.helpers({
	users: function(){
	  var user = Meteor.users.find(); 
	  return user; 
	},
  });

    //Template.adminOfProfiles.events ="click .data-cell": (e) ->Session.set("selectedCandidate", @_id)

    //Template.adminOfProfiles.selected = ->if Session.equals("selectedCandidate", @_id) then "selected" else ""

}
