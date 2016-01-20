if (Meteor.isClient) {
  Profiles = new Mongo.Collection('Profiles')
}

Router.route('/', {
  action: function(){
    this.render('Home')
  }
});

Router.route('/profiles', {
  action: function() {
    this.render('Profiles');
  }
});

/*Router.route('/what_we_do', {
  action: function() {
    this.render('What');
  }
});

Router.route('/why_we_do_it', {
  action: function() {
    this.render('Why');
  }
});

Router.route('/library', {
  action: function() {
    this.render('Library');
  }
});

Router.route('/about', {
  action: function() {
    this.render('About');
  }
});*/

Router.route('/profiles/:country', {
  waitOn: function(){
    return Meteor.subscribe('Profiles', {country: this.params.country})
  },
  data: function(){
    return Profiles.find({country: this.params.country})
  },
  action: function () {
    this.render('Profiles')
  }
});

Router.route('/profile/:_id', {
  waitOn: function(){
    console.log(this.params._id);
    return Meteor.subscribe('Profile', this.params._id)
  },
  data: function(){
    return Profiles.findOne({_id: this.params._id})
  },
  action: function (){
    this.render('Profile')
  }
});


Router.route('/editProfile/:id',{
  waitOn: function(){
    return Meteor.subscribe('Profile', this.params._id);
  },
  data: function(){
    return Profiles.findOne({_id: this.params._id});
  },
  action: function (){
    this.render('EditProfiles');
  }
});

Router.route('/signIn',{
  action: function(){
    this.render('SignIn');
  }
});
