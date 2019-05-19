import os

from app.config import database_url

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import sessionmaker


engine = create_engine(database_url)

Base = declarative_base(bind=engine)
Session = sessionmaker(bind=engine)