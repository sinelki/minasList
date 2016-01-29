if (Meteor.isClient) {
  // set up Profiles database
  Profiles = new Mongo.Collection('Profiles')
}

// render the Home template when we're at the home page
Router.route('/', {
  action: function(){
    this.render('Home')
  }
});

// subscribe all users/profiles before doing anything else
// if the user logged in is the admin, go to the admin page
  // otherwise go to the login page
Router.route('/admin',{
  waitOn: function(){
    Meteor.subscribe('allUsers');
    Meteor.subscribe('Profiles', {});
  },
  action: function (){
    if (Meteor.user().username==='admin'){
      this.render('adminOfProfiles');
    } else{
      Router.go('/login');
    }
  }
});

// subscribe the Profiles database and then load the Profiles template
Router.route('/profiles', {
  template: "Profiles",
  waitOn: function() {
    Meteor.subscribe('Profiles', {});
  },
  action: function() {
    this.render('Profiles');
  }
});

// if we're at the about page, load the About template
Router.route('/about', {
  action: function() {
    this.render('About');
  }
});

// subscribe to the Profiles database, then find the data
// corresponding to the person logged in
// render the found data and the EditProfiles template onto 
// the page
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

// if we're at the profile page, subscribe to the Profiles database
// then collect the profile information for the user from the database
// render the info and the Profiles template onto the page
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

// if we're at the login page and the user has logged in, route the page over to 
// either the admin page or the editProfile page of the user depending on who's 
// logged in. Otherwise, continue to render the login template
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

// if we're at the logout page/url, go to the login page
Router.route('/logout',{
  waitOn: function(){
    Meteor.logout(function(){Router.go('/login');});
    console.log('logout');
  }
})

// if we're at the reset password page, render the resetPassword template
Router.route('/resetPassword',{
  action: function(){
    this.render('resetPassword');
  }
})

// if we're at the resetSent page, render the resetSent template
Router.route('/resetSent',{
  action: function(){
    this.render('resetSent');
  }
})

// if we're at the setPassword page, render the setPassword template
Router.route('/setPassword',{
  data: function(){
    return {token: this.params.query.token};
  },
  action: function(){
    this.render('setPassword');
  }
})
