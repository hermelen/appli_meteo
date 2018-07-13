
$(document).ready(function() {
	var mymap = L.map('mapid').setView([47.2250638, 2.690954], 6);
	var nuit = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
		id: 0,
		attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
		bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
		minZoom: 1,
		maxZoom: 8,
		format: 'jpg',
		time: '',
		tilematrixset: 'GoogleMapsCompatible_Level'
    });
	var jour = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
		id: 1,
		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		subdomains: 'abcd',
		minZoom: 0,
		maxZoom: 18,
		ext: 'png'
	});
	jour.addTo(mymap);

		$.get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=contours-simplifies-des-departements-francais-2015&rows=150&facet=code_dept', function( depts ) {
			var markers = new L.MarkerClusterGroup();
			$.each(depts.records, function(i, dept){
				L.geoJSON(dept.fields.geo_shape).addTo(mymap);
				// $.each(depts.records, function(i, dept){
				// 	L.geoJSON(dept.fields.geo_shape, {
				// 		style: function(feature) {
				// 			switch (feature.properties.party) {
				// 			case 'Republican': return {color: "#ff0000"};
				// 			case 'Democrat':   return {color: "#0000ff"};
				// 		}
				// 	}
				// }).addTo(mymap);
				$.get('http://api.openweathermap.org/data/2.5/weather?q=' + dept.fields.nom_chf + ',fr&APPID=9320a50df4522e7606195b5c99b563a6', function( city ) {
					var thisIcon = L.icon({
						iconUrl: "https://openweathermap.org/img/w/" + city.weather[0].icon + ".png",
						iconSize: [80, 80], // size of the icon
						iconAnchor: [40, 40], // point of the icon which will correspond to marker's location
					});
					var marker = L.marker([city.coord.lat, city.coord.lon], {icon: thisIcon}).bindPopup( city.name )
					markers.addLayer(marker);
				})
			})
			markers.addTo(mymap);
	})

	var baseMaps = {
    	"Jour": jour,
    	"Nuit": nuit
	};
	L.control.layers(baseMaps).addTo(mymap);


})

























// map.on('move', function(){
// 	console.log(map.getCenter(), map.getZoom()
// })
