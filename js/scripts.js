

mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A'

// lngLat for the fountain in Washington Square Park
var wspCenter = [-73.997456, 40.730831]


var map = new mapboxgl.Map({
  container: 'mapContainer', // HTML container id
  style: 'mapbox://styles/mapbox/dark-v9', // style URL
  center: wspCenter, // starting position as [lng, lat]
  zoom: 10,
  // minZoom: 9,
  // maxZoom: 14
});

// Add the control to the map.
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);

map.addControl(new mapboxgl.NavigationControl());
