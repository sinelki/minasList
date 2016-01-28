Meteor.subscribe('Profiles');

Template.Profiles.helpers({
	'profile': function() {
		var paramQuery = Router.current().params.query.dropdown;
		var paramText = Router.current().params.query.choice;
		if (paramQuery === "country") {
			//console.log("by country");
			var result =  Profiles.find({country: {$regex: paramText, $options: "i"}}).fetch();
		}
		else if (paramQuery === "name") {
			//console.log("by name");
			var result = Profiles.find({name: {$regex: paramText, $options: "i"}}).fetch();
		}
		else {
			//console.log("all");
			var result = Profiles.find({}).fetch();
		}
		//console.log(result);
		return result;
	}
});