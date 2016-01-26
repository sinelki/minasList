Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function () {
            // login is now complete so do what you'd like.
            if (! Meteor.userId()) {
              throw new Meteor.Error("not-authorized");
            }
            else{
              Router.go('/editProfile/'+Meteor.userId());
            }
        });
    }
});
