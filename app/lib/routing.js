if (Meteor.isClient) {
  Profiles = new Mongo.Collection('Profiles')
}

Router.route('/', {
  action: function(){
    this.render('Home')
  }
});

Router.route('/admin',{
  waitOn: function(){
    Meteor.subscribe('allUsers');
  },
  action: function (){
    if (Meteor.user().username==='admin'){
      this.render('adminOfProfiles');
    } else{
      Router.go('/login');
    }
  }
});

Router.route('/profiles', {
  template: "Profiles",
  waitOn: function() {
    Meteor.subscribe('Profiles', {});
  },
  action: function() {
    this.render('Profiles');
  }
});

Router.route('/about', {
  action: function() {
    this.render('About');
  }
});


Router.route('/editProfile/:_id',{
  waitOn: function(){
    return Meteor.subscribe('Profile', this.params._id);
  },
  data: function(){
    if (Meteor.userId()===this.params._id){
      return Profiles.findOne({owner: this.params._id});
    }
  },
  action: function (){
    if (Meteor.userId()===this.params._id){
      this.render('EditProfiles');
    } else{
      Router.go('/login');
    }
  }
});

Router.route('/profile/:_id', {
  waitOn: function(){
    console.log(this.params._id);
    Meteor.subscribe('Profile', this.params._id);
  },
  data: function(){
    console.log(Profiles.findOne({owner: this.params._id}));
    return Profiles.findOne({owner: this.params._id});
  },
  action: function (){
    this.render('Profile')
  }
});

Router.route('/login',{
  waitOn: function(){
    if(Meteor.userId()){
      console.log('login',Meteor.user());
      if (Meteor.user().username==='admin'){
        Router.go('/admin');
      }
      else{
        Router.go('/editProfile/'+Meteor.userId());
      }
    }
  },
  action: function(){
    this.render('login');
  }
});

Router.route('/logout',{
  waitOn: function(){
    Meteor.logout(function(){Router.go('/login');});
    console.log('logout');
  }
})

Router.route('/resetPassword',{
  action: function(){
    this.render('resetPassword');
  }
})

Router.route('/resetSent',{
  action: function(){
    this.render('resetSent');
  }
})

Router.route('/setPassword',{
  data: function(){
    return {token: this.params.query.token};
  },
  action: function(){
    this.render('setPassword');
  }
})
