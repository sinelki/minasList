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
    if (Meteor.userId()===Meteor.users.findOne({username:'admin'})._id){
      this.render('adminOfProfiles');
    } else{
      Router.go('/login');
    }

  }
});

Router.route('/profiles', {
  action: function() {
    this.render('Profiles');
  }
});

Router.route('/about', {
  action: function() {
    this.render('About');
  }
});

Router.route('/profiles/:country', {
  waitOn: function(){
    return Meteor.subscribe('Profiles', {country: this.params.country})
  },
  data: function(){
    /*return {data: Profiles.find({})};*/
    return {data: "monkey"};
    if (this.params.dropdown === "country") {
      var result = Profiles.find({country: {$regex: /this.params.choice/i}});
      /*console.log(x);
      return x;*/
      return {data: result};
    }
    else if (this.params.dropdown === "name") {
       var result = Profiles.find({name: {$regex: /this.params.choice/i}});
       return {data: result};
    }
  },
  action: function () {
    this.render('Profiles')
    console.log("action data");
    console.log(this.getData());
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

Router.route('/login',{
  action: function(){
    if (Meteor.userId()===Meteor.users.findOne({username:'admin'})._id){
      Router.go('/admin');
    }
    else if(Meteor.userId()){
      Router.go('/profile/'+Meteor.userId());
    }
    this.render('login');
  }
});
