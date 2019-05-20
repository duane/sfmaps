from app.db import engine, Base, FeatureCollection


class BusStop(FeatureCollection, Base):
  __tablename__ = 'bus_stops'