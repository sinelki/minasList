var doneCallback;

Accounts.onResetPasswordLink(function(token, done) {
  Session.set('resetPasswordToken', token);  // pull token and place in a session variable, so it can be accessed later
  doneCallback = done;  // Assigning to variable
});

Accounts.onEnrollmentLink(function(token, done) {
  Session.set('resetPasswordToken', token);  // pull token and place in a session variable, so it can be accessed later
  doneCallback = done;  // Assigning to variable
})

Template.setPassword.events({
  'keyup Input': function(event,template){
    var password1 = template.find('[name=password1]').value;
    var password2 = template.find('[name=password2]').value;
    if (password1===password2){
      Session.set('passwordError',null);
    } else{
      Session.set('passwordError','passwords are not equal');
    }
  },
  'submit form': function(event){
    event.preventDefault();
    console.log(event);
    var password1 = event.target.password1.value;
    var password2 = event.target.password2.value;
    if(password1===password2){
      console.log('a');
      if(Meteor.userId()){
        console.log('b');
        var password0 = event.target.password0.value;
        console.log(password0);
        Accounts.changePassword(password0,password1, function(){
          console.log('changing');
        });
      } else{
        Accounts.resetPassword(Session.get('resetPasswordToken'),password1);
        if (doneCallback){
          doneCallback();
        }
        Session.set('resetPasswordToken', '');
      }
      Router.go('/login');
    }
  }
});

Template.setPassword.helpers({
  passwordError: function(){return Session.get('passwordError');}
})
