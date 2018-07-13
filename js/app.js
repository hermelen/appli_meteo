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
			$.ajax({
				url: "http://api.openweathermap.org/data/2.5/weather?q=" + name + ",fr&APPID=9320a50df4522e7606195b5c99b563a6",
				datatype: 'json',
				success: function(data, statut) {
					// +data['weather'][0]['description']
					var img = "<img src='https://openweathermap.org/img/w/" + data['weather'][0]['icon'] + ".png' alt=''>";
					var imgUrl = "https://openweathermap.org/img/w/" + data['weather'][0]['icon'] + ".png";
					var thisIcon = L.icon({
						iconUrl: imgUrl,
						// shadowUrl: 'leaf-shadow.png',

						iconSize: [38, 38], // size of the icon
						// shadowSize: [50, 64], // size of the shadow
						// iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
						// shadowAnchor: [4, 62], // the same for the shadow
						// popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
					});
					var popUpData = data['name'] + ", " + img;
					L.marker([data['coord']["lat"], data['coord']["lon"]], { icon: thisIcon	}).bindPopup(popUpData).openPopup().addTo(mymap);

				},
				error: function(resultat, statut, erreur) {},
				complete: function(resultat, statut) {}
			})
			// }
		}
	}


})
