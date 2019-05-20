import { map } from "leaflet";

window.map.on('load', () => {
  console.log(window.map);
  let colors = ["#c0e15c", "#1e7b20", "#7cee4d", "#768a60", "#c9d9c1", "#683d0d", "#efaa79"];
  const parcelLayer = {
    "id": "parcels",
    "source": {
      type: "vector",
      tiles: [
        "http://localhost:1234/parcel/{z}/{x}/{y}.mvt"
      ],
      minzoom: 10,
      maxzoom: 20
    },
    "source-layer": "undefined",
    "type": "fill",
    
    "paint": {
      'fill-color':  ["case",
        ['==', ['get', 'zoning_sim'], 'RH-1'], colors[0],
        ['==', ['get', 'zoning_sim'], 'RH-1(D)'], colors[0],
        ['==', ['get', 'zoning_sim'], 'RH-1(S)'], colors[0],
        ['==', ['get', 'zoning_sim'], 'RH-2'], colors[0],
        ['==', ['get', 'zoning_sim'], 'RH-3'], colors[0],

        ['==', ['get', 'zoning_sim'], 'RM-1'], colors[1],
        ['==', ['get', 'zoning_sim'], 'RM-2'], colors[1],
        ['==', ['get', 'zoning_sim'], 'RM-3'], colors[1],
        ['==', ['get', 'zoning_sim'], 'RM-4'], colors[1],

        ['==', ['get', 'zoning_sim'], 'RC-3'], colors[2],
        ['==', ['get', 'zoning_sim'], 'RC-4'], colors[2],

        ['==', ['get', 'zoning_sim'], 'RTO'], colors[3],
        ['==', ['get', 'zoning_sim'], 'RTO-M'], colors[3],

        ['==', ['get', 'zoning_sim'], 'RH-DTR'], colors[4],
        ['==', ['get', 'zoning_sim'], 'SB-DTR'], colors[4],
        ['==', ['get', 'zoning_sim'], 'TB-DTR'], colors[4],


        ['==', ['get', 'zoning_sim'], 'P'], colors[5],
        colors[6]
      ],
      "fill-opacity": 0.4,
    }
  };
  window.map.addLayer(parcelLayer)
  const busStopLayer = {
    "id": "bus-stops",
    "source": {
      type: "geojson",
      data: "http://localhost:1234/bus_stops.geojson"
    },
    "type": "symbol",
    "layout": {
      "icon-image": "bus-11",
      "icon-size": 0.5,
    }
  };
  window.map.addLayer(busStopLayer);
  window.map.addControl(new mapboxgl.NavigationControl());

  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });


  window.map.on('click', 'parcels', (e) => {
    let coordinates = e.features[0].geometry.coordinates.slice();

    while (Array.isArray(coordinates[0])) coordinates = coordinates[0];
    var description = '<pre>' + JSON.stringify(e.features[0].properties, undefined, 2) + '</pre>';
    
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    
    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates)
      .setHTML(description)
      .addTo(window.map);
  });
});
