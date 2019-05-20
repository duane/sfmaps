from . import engine, Base
import app.model.bus_stops
import app.model.parcels

if __name__ == "__main__":
  Base.metadata.drop_all()