var mymap = L.map('mapid').setView([47.2250638, 2.690954], 6);
// ,6z
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(mymap);


$(document).ready(function() {

	$.ajax({
		url: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=contours-simplifies-des-departements-francais-2015&rows=150&facet=code_dept',
		// type: 'GET',
		datatype: 'json',
		success: function(data, statut) {
			displayCities(data);
            weather(displayCities(data));
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
            return name;
		}
	}

    function weather(city) {
        $.ajax({
            url: "api.openweathermap.org/data/2.5/weather?q=" + city + ",fr&APPID=9320a50df4522e7606195b5c99b563a6",
            datatype: 'json',
            success: function(data, statut) {
    		    var marker = L.marker(['data']['coord']["lat"],['data']['coord']["lon"]).addTo(mymap);
                console.log(marker);
    		},
    		error: function(resultat, statut, erreur) {

    		},
    		complete: function(resultat, statut) {

    		}
        })
    }
	// var marker = L.marker([51.5, -0.09]).addTo(mymap);

})
