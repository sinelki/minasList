if (Meteor.isClient) {
    //Upon submitting form, the candidates profile is updated with information they provide
    Template.editInfoForm.events({
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
      var buttonIDVar = event.target.buttonID.value;
	console.log(dateVar);
	console.log({name: nameVar, date: dateVar, country: countryVar, city: cityVar, description: positionVar, posts: [], owner: ownerVar});
	Meteor.call("updateProfile",{name: nameVar, date: dateVar, country: countryVar, city: cityVar, description: positionVar, posts: [], owner: ownerVar, buttonID: buttonIDVar});
	console.log(Profiles.find({}));
    }
	
  });

  //Skeleton code - Not tested or properly implemented
  Template.addPicForm.events({ 
  'submit form': function(e, template) {
    e.preventDefault();
    var file = template.find('input type=["file"]').files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      // Add it to your model
      model.update(id, { $set: { src: e.target.result }});

      // Update an image on the page with the data
      $(template.find('img')).attr('src', e.target.result);
    }
    reader.readAsDataURL(file);
  }
  });

}
