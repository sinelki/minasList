Router.route('/', function(){
  this.render('Home');
});

Router.route('/Profiles/:country', function(){
  this.render('Profiles',{
    data:function(){
      var a=Profiles.find({'country':country});
      console.log(a);
      return a;
    }
  });
});


//Router.route('/About'. function(){
//  this.render('About');
//});
