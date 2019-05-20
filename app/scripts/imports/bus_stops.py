from app.config import cache_path
from app.util import download_file, strip_to_none
from app.model.bus_stops import BusStop
from app.db import Session


import csv
import io
import zipfile


url = "https://gtfs.sfmta.com/transitdata/google_transit.zip"

transit_cache_path = cache_path / 'transit'
google_transit_cache_path = transit_cache_path / 'google_transit.zip'

transit_cache_path.mkdir(exist_ok=True, parents=True)
if not google_transit_cache_path.exists():
  print("Downloading %s to %s" % (url, google_transit_cache_path))
  download_file(url, google_transit_cache_path)

with zipfile.ZipFile(google_transit_cache_path) as zipf:
  stops_data = io.StringIO(zipf.read('stops.txt').decode())
  csv_in = csv.DictReader(stops_data)
  with Session() as session:
    rows = [BusStop(
      properties = {
        "stop_id": row['stop_id'],
        "stop_code": row['stop_code'],
        "stop_name": strip_to_none(row['stop_name'])
      },
      geom = 'SRID=4326;POINT(%s %s)' % (row['stop_lon'], row['stop_lat'])
    ) for row in csv_in]
    session.add_all(rows)
    session.commit()

