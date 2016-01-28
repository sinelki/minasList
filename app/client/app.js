Template.Home.helpers({
  resetPasswordToken: function() {
    console.log('aaaa',Session.get('resetPasswordToken'));
    return Session.get('resetPasswordToken');
  }
});
