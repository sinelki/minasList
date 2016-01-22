if (Meteor.isClient) {
    Template.editInfoForm.events({
    'submit form': function(event){
      event.preventDefault();
      var cityVar = event.target.city.value;
      var countryVar = event.target.country.value;
      var positionVar = event.target.position.value;
      Profiles.insert({
          city: cityVar,
	  country: countryVar,
	  description: positionVar
      });
    }
  });

}
