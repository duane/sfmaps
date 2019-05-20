from app.db import engine, Base, FeatureCollection

from sqlalchemy import Column, Integer, Text, MetaData, Table
from geoalchemy2 import Geography

class Parcel(FeatureCollection, Base):
  __tablename__ = 'parcels'

