from app.config import cache_path
from app.util import download_file
from app.model.parcels import Parcel
from app.db import Session
import sqlalchemy
from sqlalchemy.dialects.postgresql import JSON


import json
from itertools import zip_longest

def grouper(iterable, n, fillvalue=None):
    args = [iter(iterable)] * n
    return zip_longest(*args, fillvalue=fillvalue)

url = "https://data.sfgov.org/api/geospatial/6b2n-v87s?method=export&format=GeoJSON"

parcels_cache_path = cache_path / 'parcels'
parcel_geojson_path = parcels_cache_path / 'parcels-with-planning-department-zoning.geojson'

if not parcel_geojson_path.exists():
  parcels_cache_path.mkdir(exist_ok=True)
  print("Downloading %s to %s" % (url, parcel_geojson_path))
  download_file(url, parcel_geojson_path)

parcels_geojson = json.load(open(parcel_geojson_path))
session = Session()
total = 0
for feature_chunk in grouper(parcels_geojson['features'], 1000, fillvalue=None):
  parcel_rows = []
  for feature in feature_chunk:
    if not feature:
      break
    properties = feature['properties']
    del feature['properties']
    row = Parcel(
      properties = properties,
      geom = sqlalchemy.func.ST_SetSRID(sqlalchemy.func.ST_GeomFromGeoJSON(json.dumps(feature['geometry'])), 4326)
    )
    parcel_rows.append(row)
  session.add_all(parcel_rows)
  session.commit()
  total += len(feature_chunk)
  print("Imported %d parcels" % total)
  