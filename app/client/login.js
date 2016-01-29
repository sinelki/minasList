Template.login.events({
    // function to determine routing to the next page depending on login outcome
    'submit form': function(event){
        event.preventDefault();
        console.log(event);
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        console.log(emailVar,passwordVar);
        Meteor.loginWithPassword(emailVar, passwordVar, function () {
           console.log(Meteor.user());
            // login is now complete so do what you'd like.
            console.log(Meteor.user());
            // throw an error if the user who attempted to log in does not have an account
            if (! Meteor.userId()) {
              throw new Meteor.Error("not-authorized");
            }
            // go to the admin page if the user logging in is the administrator
            else if (Meteor.user().username==='admin'){
              console.log('yay');
              Router.go('/admin');
            }
            // go to the profile page of the person who successfully logged in
            else{
              Router.go('/editProfile/'+Meteor.userId());
            }
        });
    }
});
