import os

from app.config import database_url

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import sessionmaker

from sqlalchemy import Column, Integer, Text, MetaData, Table
from geoalchemy2 import Geography

engine = create_engine(database_url)

Base = declarative_base(bind=engine)
Session = sessionmaker(bind=engine)

class FeatureCollection(object):
  id = Column(Integer, primary_key=True)
  properties = Column(JSONB, nullable=False)
  geom = Column(Geography, nullable=True)
