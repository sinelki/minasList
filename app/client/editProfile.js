if (Meteor.isClient) {
    Template.EditProfiles.events({
    'submit form': function(event){
      event.preventDefault();
      var nameVar = event.target.name.value;
      console.log(nameVar);
      var dateVar = this.date;
      if (!this.date) {
      	dateVar = new Date();
      }
      var ownerVar = this.owner;
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
	console.log(dateVar);
	console.log({name: nameVar, date: dateVar, country: countryVar, city: cityVar, description: positionVar, posts: [], owner: ownerVar});
	Meteor.call("updateProfile",{name: nameVar, date: dateVar, country: countryVar, city: cityVar, description: positionVar, posts: [], owner: ownerVar});
	console.log(Profiles);
    }
	
  });

}
