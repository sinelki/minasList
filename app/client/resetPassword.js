Template.resetPassword.events({
    'submit form': function(event){
        event.preventDefault();
        console.log(event);
        var emailVar = event.target.loginEmail.value;
        Meteor.call('tryResetPassword',emailVar);
        Router.go('/resetSent');
    }
});
