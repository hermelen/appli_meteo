

$(document).ready(function() {
	var mymap = L.map('mapid').setView([47.2250638, 2.690954], 6);
	// ,6z
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

	$.ajax({
		url: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=contours-simplifies-des-departements-francais-2015&rows=150&facet=code_dept',
		// type: 'GET',
		datatype: 'json',
		success: function(data, statut) {
			displayCities(data);
            // weather(displayCities(data));
		},
		error: function(resultat, statut, erreur) {

		},
		complete: function(resultat, statut) {

		}
	})

	function displayCities(data) {
		for (dept of data['records']) {
			var shape = dept['fields']['geo_shape'];
            var name = dept['fields']['nom_chf'];
            var geoPoint = dept['fields']['geo_point_2d'];
            L.geoJSON(shape).addTo(mymap);
			// var marker = L.marker([dept['fields']['geo_point_2d'][0], dept['fields']['geo_point_2d'][1]]).addTo(mymap);
			// function weather(name) {
			console.log("api.openweathermap.org/data/2.5/weather?q="+name+",fr&APPID=9320a50df4522e7606195b5c99b563a6");
			    $.ajax({
			        url: "http://api.openweathermap.org/data/2.5/weather?q="+name+",fr&APPID=9320a50df4522e7606195b5c99b563a6",
			        datatype: 'json',
			        success: function(data, statut) {
						console.log("success");
					    var marker = L.marker([data['coord']["lat"],data['coord']["lon"]]).addTo(mymap);
					},
					error: function(resultat, statut, erreur) {
						console.log("error");
					},
					complete: function(resultat, statut) {
						console.log("complete");
					}
			    })
			// }
		}
	}


})
