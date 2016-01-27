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

}
