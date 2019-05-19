import os
import pathlib

database_url = os.environ['DATABASE_URL']
app_root = pathlib.Path(os.path.abspath(__file__)).parent.parent
cache_path = app_root / 'cache'