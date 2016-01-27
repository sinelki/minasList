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

Template.profileHeaders.events({
	'click #filter-by': function() {
		var filterForm = document.getElementById("filter-profile-block");
		if (filterForm.style.display == "none") {
			filterForm.style.display = "block";
		}
		else {
			filterForm.style.display = "none";
		}
	}

	
});