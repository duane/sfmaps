import { readFileSync } from 'fs'
import geojson2mvt from 'geojson2mvt'
import geojsonBoundingBox from '../utils/geojson-bounding-box'

const filename = process.argv[2]
const file = readFileSync(filename, { encoding: 'utf-8' })
const parsed = JSON.parse(file)

const boundingBox = geojsonBoundingBox(parsed as GeoJSON.FeatureCollection)
if (boundingBox) {
  let options = {
    rootDir: 'tiles',
    bbox: [boundingBox[1], boundingBox[0], boundingBox[3], boundingBox[2]],
    zoom: {
      min: 10,
      max: 18,
    },
  };
  geojson2mvt(parsed, options)
}
