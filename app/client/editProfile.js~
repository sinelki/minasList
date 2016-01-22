if (Meteor.isClient) {
    Template.EditProfiles.events({
    'submit form': function(event){
      event.preventDefault();
      var nameVar = this.name;
      console.log(nameVar);
      var dateVar = this.date;
      var cityVar = event.target.city.value;
      var countryVar = event.target.country.value;
      var positionVar = event.target.position.value;
      var platformVar = event.target.platform.value;
      /*Profiles.insert({
          city: cityVar,
	  country: countryVar,
	  description: positionVar,
	  platform: platformVar
      });*/
	Meteor.call("updateProfile",{nameVar, dateVar, countryVar, positionVar});
	console.log(Profiles);
    }
	
  });

}
