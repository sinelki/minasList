var doneCallback;

Accounts.onResetPasswordLink(function(token, done) {
  Session.set('resetPasswordToken', token);  // pull token and place in a session variable, so it can be accessed later
  doneCallback = done;  // Assigning to variable
});

Template.resetPassword.events({
  'submit form': function(event){
    event.preventDefault();
    console.log(event);
    var emailVar = event.target.loginEmail.value;
    Meteor.call('tryResetPassword',emailVar);
    Session.set('resetPasswordToken', '');
    if (doneCallback){
      doneCallback();
    }
    Router.go('/resetSent');
  }
});
