Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        console.log(event);
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        console.log(emailVar,passwordVar);
        Meteor.loginWithPassword(emailVar, passwordVar, function () {
            // login is now complete so do what you'd like.
            console.log(Meteor.user());
            if (! Meteor.userId()) {
              throw new Meteor.Error("not-authorized");
            }
            else if (Meteor.user().username==='admin'){
              console.log('yay');
              Router.go('/admin');
            }
            else{
              Router.go('/editProfile/'+Meteor.userId());
            }
        });
    }
});
