from app.model.bus_stops import BusStop
from app.db import engine

import json

features = [feature[0] for feature in engine.execute("select json_build_object('type', 'Feature', 'properties', properties::jsonb, 'geometry', ST_AsGeoJSON(geom)::jsonb) from bus_stops;")]
feature_collection = {
  'type': 'FeatureCollection',
  'features': features
}

with open('bus_stops.geojson', 'w') as f:
  f.write(json.dumps(feature_collection))