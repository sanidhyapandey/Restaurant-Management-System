const mapUse1 = document.getElementById('mapUse');
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
if(mapUse1) {

 
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuaWRoeWEtcGFuZGV5IiwiYSI6ImNra3Zib3FibTF5eWYydnMxcXNyenluaDcifQ.UAq2RToU_LYxfpXiYwCFGw';
var map = new mapboxgl.Map({
container: 'mapUse',
style: 'mapbox://styles/mapbox/streets-v11',
center: [80,13],
zoom: 7.5

});

var marker = new mapboxgl.Marker()
.setLngLat([80,13])
.addTo(map);

var coordinatesGeocoder = function (query) {
// match anything which looks like a decimal degrees coordinate pair
var matches = query.match(
/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
);
if (!matches) {
return null;
}
 
function coordinateFeature(lng, lat) {
return {
center: [lng, lat],
geometry: {
type: 'Point',
coordinates: [lng, lat]
},
place_name: 'Lat: ' + lat + ' Lng: ' + lng,
place_type: ['coordinate'],
properties: {},
type: 'Feature'
};
}
 
var coord1 = Number(matches[1]);
var coord2 = Number(matches[2]);
var geocodes = [];
 
if (coord1 < -90 || coord1 > 90) {
// must be lng, lat
geocodes.push(coordinateFeature(coord1, coord2));
}
 
if (coord2 < -90 || coord2 > 90) {
// must be lat, lng
geocodes.push(coordinateFeature(coord2, coord1));
}
 
if (geocodes.length === 0) {
// else could be either lng, lat or lat, lng
geocodes.push(coordinateFeature(coord1, coord2));
geocodes.push(coordinateFeature(coord2, coord1));
}
 
return geocodes;
};
 
map.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
localGeocoder: coordinatesGeocoder,
zoom: 4,
placeholder: 'Try: -40, 170',
mapboxgl: mapboxgl
})
);
}