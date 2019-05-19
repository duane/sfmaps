from app.db import engine, Base

from sqlalchemy import Column, Integer, Text, MetaData, Table
from geoalchemy2 import Geography

class BusStop(Base):
  __tablename__ = 'bus_stops'
  id = Column(Integer, primary_key=True)
  stop_id = Column(Integer, nullable=False, unique=True)
  stop_code = Column(Integer, nullable=False, unique=True)
  stop_name = Column(Text, nullable=True)
  stop_place = Column(Geography(geometry_type="POINT"), nullable=False)

