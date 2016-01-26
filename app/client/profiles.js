Meteor.subscribe('Profiles');
var filter_div = document.getElementById('filter-by');
filter_div.style.cursor = 'pointer';
filter_div.onclick = function() {
    // do something...
    var filter_choice = prompt("Please select your choice of filter");
};