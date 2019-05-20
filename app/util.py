import requests
import string

def download_file(url, to_path):
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(to_path, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192): 
                if chunk: # filter out keep-alive new chunks
                    f.write(chunk)

def strip_to_none(s):
    stripped = s.strip()
    if stripped:
        return stripped
    