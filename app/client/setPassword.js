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
      var password2 = event.target.password1.value;
      if(password1===password2){
        Meteor.call('trySetPassword',this.token,password1);
        Router.go('/login');
      }
  }
});

Template.setPassword.helpers({
  passwordError: function(){return Session.get('passwordError');}
})
