import * as L from 'leaflet';
import districts from './current-supervisor-districts.json';

const mapEl = document.getElementById('mapid');

mapEl!.style.cssText = `height: ${window.innerWidth || document.body.clientWidth}px`;
window.onresize = (event) => {
  mapEl!.style.cssText = `height: ${window.innerWidth || document.body.clientWidth}px`;
};
const map = L.map('mapid');
var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 20, attribution: osmAttrib});		

map.setView(new L.LatLng(37.773972, -122.431297), 13);
map.addLayer(osm);

L.geoJSON(districts, {
    onEachFeature: (feature, layer) => layer.bindPopup(feature.properties.supdist)
  }).
  addTo(map);