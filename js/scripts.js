mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A'

function getRandomColor() {

  var colors = ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3']
  return colors[Math.floor(Math.random() * colors.length)];

}

var nycBounds = [[-74.333496,40.469935], [-73.653717,40.932190]]
var map = new mapboxgl.Map({
  container: 'mapContainer', // HTML container id
  style: 'mapbox://styles/mapbox/dark-v9', // style URL
  bounds: nycBounds,
  maxBounds: nycBounds,
  maxZoom: 12
});

$.getJSON('https://data.cityofnewyork.us/api/geospatial/cpf4-rkhq?method=export&format=GeoJSON', function(nycNtas) {
  nycNtas.features = nycNtas.features.map(function(feature) {
    feature.properties.color = getRandomColor()
    return feature
  })
  console.log(nycNtas)
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
        'fill-color': ['get', 'color'],
        'fill-opacity': 0.7
      }
    }, 'water-label')
  })
})

map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);

map.addControl(new mapboxgl.NavigationControl());

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

$('.reset').on('click', function() {
  map.fitBounds(nycBounds)
})
