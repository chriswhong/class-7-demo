// mapboxgl access token, used to track my usage of basemaps and other services
mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A'

// gets a random color, palette from colorbrewer https://colorbrewer2.org/
function getRandomColor() {
  var colors = ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3']
  return colors[Math.floor(Math.random() * colors.length)];
}

// bounds for a citywide view of New York
var nycBounds = [[-74.333496,40.469935], [-73.653717,40.932190]]

// initialize the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/dark-v9',
  bounds: nycBounds, // sets initial bounds instead of center + zoom
  maxBounds: nycBounds, // sets the max bounds, limited where the user can pan to
  maxZoom: 12 // sets the maximum zoom level
});

// fetch geojson directly from the NYC open data portal
$.getJSON('https://data.cityofnewyork.us/api/geospatial/cpf4-rkhq?method=export&format=GeoJSON', function(nycNtas) {

  // inject a 'color' property into each feature, generated randomly from a list of 5 colors
  nycNtas.features = nycNtas.features.map(function(feature) {
    feature.properties.color = getRandomColor()
    return feature
  })

  // add source and layer when the map is finished loading
  map.on('load', function() {
    map.addSource('nyc-neighborhoods', {
      type: 'geojson',
      data: nycNtas
    })

    map.addLayer({
      id: 'nyc-neighborhoods-fill',
      type: 'fill',
      source: 'nyc-neighborhoods',
      paint: {
        'fill-color': ['get', 'color'], // use the color property assigned above as the fill color
        'fill-opacity': 0.7
      }
    }, 'water-label') // insert this layer below the map labels
  })
})

// add the mapbox geocoder plugin
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);

// add navigation controls to the map
map.addControl(new mapboxgl.NavigationControl());

// listen for clicks on the neighborhood flyto buttons
$('.flyto').on('click', function() {
  if ($(this).hasClass('flyto-the-village')) {
    newCenter = [-74.001745,40.729778]
  }

  if ($(this).hasClass('flyto-fidi')) {
    newCenter = [-74.009485,40.707873]
  }

  if ($(this).hasClass('flyto-washington-heights')) {
    newCenter = [-73.941626,40.840029]
  }

  map.flyTo({
    center: newCenter,
    zoom: 12
  })
})

// listen for click on the 'Back to City View' button
$('.reset').on('click', function() {
  map.fitBounds(nycBounds)
})
