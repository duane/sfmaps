from . import engine, Base
import app.model.bus_stops

if __name__ == "__main__":
  Base.metadata.drop_all()