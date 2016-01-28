Template.setPassword.events({
  'keypress Input': function(){
    var password1 = template.find('password1').value;
    var password2 = template.find('password2').value;
    if (password1===password2){
      Session.set('passwordError',null);
    } else{
      Session.set('passwords are not equal',null);
    }
  },
  'submit form': function(event){
      event.preventDefault();
      console.log(event);
      var password1 = event.target.password1.value;
      var password2 = event.target.password1.value;
      if(password1===password2){
        Meteor.call('trySetPassword',password1);
        Router.go('/login');
      }
  }
});

Template.setPassword.helpers({
  pError: function(){
    var password1 = document.getElementByName('password1').value;
    var password2 = document.getElementByName('password2').value;
    if (password1!==password2){
      return 'passwords are not equal';
    } else{
      return 'peasasas';
    }
  },
  dog: 'cow'
})
