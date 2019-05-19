from . import engine, Base
import app.model.bus_stops

def extensions(conn):
  conn.execute("CREATE EXTENSION IF NOT EXISTS postgis;")

if __name__ == "__main__":
  extensions(engine.connect())
  Base.metadata.create_all()