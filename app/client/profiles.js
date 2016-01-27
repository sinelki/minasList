Meteor.subscribe('Profiles');

Template.hello.events({
    'click .clickable': function() {
      var changeDiv = document.getElementById("make-visible");
      if (changeDiv.style.display == "none") {
        changeDiv.style.display = "block";
      }
      else {
        changeDiv.style.display = "none";
      }
    }
  });

/*Template.profileHeaders.events({
	'click #filter-by': function() {
		var filterForm = document.getElementById("filter-profile-block");
		if (filterForm.style.display == "none") {
			filterForm.style.display = "block";
		}
		else {
			filterForm.style.display = "none";
		}
	}
});*/

Template.profileHeaders.helpers({
	'click #submit': function() {
		var drop = document.getElementById("dropdown-content");
		console.log(drop);
		var key = drop.options[drop.selectedIndex].value;
		var textbox = document.getElementById("choice");
		var val = textbox.value;
		if (key == "country") {
			Router.go('/profiles');
			this.render('Profiles');
		}
		console.log("You have selected " + key);
	}
});