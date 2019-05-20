function updateBoundingBox2dWithPosition(
  position: GeoJSON.Position,
  bounds: GeoJSON.BBox | null
): GeoJSON.BBox {
  bounds = bounds || [position[0], position[1], position[0], position[1]]
  bounds[0] = bounds[0] < position[0] ? bounds[0] : position[0]
  bounds[2] = bounds[2] > position[0] ? bounds[2] : position[0]
  bounds[1] = bounds[1] < position[1] ? bounds[1] : position[1]
  bounds[3] = bounds[3] > position[1] ? bounds[3] : position[1]
  return bounds
}

function updateBoundingBox2dWithPoint(
  point: GeoJSON.Point,
  bounds: GeoJSON.BBox | null
): GeoJSON.BBox {
  bounds = updateBoundingBox2dWithPosition(point.coordinates, bounds)
  return bounds
}

function updateBoundingBox2dWithMultiPoint(
  points: GeoJSON.MultiPoint,
  bounds: GeoJSON.BBox | null
): GeoJSON.BBox {
  for (const coordinate of points.coordinates) {
    bounds = updateBoundingBox2dWithPosition(coordinate, bounds)
  }
  return bounds as GeoJSON.BBox
}

function updateBoundingBox2dWithLineString(
  lineString: GeoJSON.LineString,
  bounds: GeoJSON.BBox | null
): GeoJSON.BBox {
  for (const coordinate of lineString.coordinates) {
    bounds = updateBoundingBox2dWithPosition(coordinate, bounds)
  }
  return bounds as GeoJSON.BBox
}

function updateBoundingBox2dWithMultiLineString(
  multiLineString: GeoJSON.MultiLineString,
  bounds: GeoJSON.BBox | null
): GeoJSON.BBox {
  for (const lineString of multiLineString.coordinates) {
    for (const coordinate of lineString) {
      bounds = updateBoundingBox2dWithPosition(coordinate, bounds)
    }
  }
  return bounds as GeoJSON.BBox
}

function updateBoundingBox2dWithPolygon(
  polygon: GeoJSON.Polygon,
  bounds: GeoJSON.BBox | null
): GeoJSON.BBox {
  for (const coordinate of polygon.coordinates[0]) {
    bounds = updateBoundingBox2dWithPosition(coordinate, bounds)
  }
  return bounds as GeoJSON.BBox
}

function updateBoundingBox2dWithMultiPolygon(
  multiPolygon: GeoJSON.MultiPolygon,
  bounds: GeoJSON.BBox | null
): GeoJSON.BBox {
  for (const polygon of multiPolygon.coordinates) {
    for (const lineString of polygon) {
      for (const coordinate of lineString) {
        bounds = updateBoundingBox2dWithPosition(coordinate, bounds)
      }
    }
  }
  return bounds as GeoJSON.BBox
}

function updateBoundingBox2dWithGeometry(
  geometry: GeoJSON.Geometry,
  bounds: GeoJSON.BBox | null
): GeoJSON.BBox {
  switch (geometry.type) {
    case 'Point':
      bounds = updateBoundingBox2dWithPoint(geometry as GeoJSON.Point, bounds)
      break
    case 'LineString':
      bounds = updateBoundingBox2dWithLineString(geometry as GeoJSON.LineString, bounds)
      break
    case 'MultiPoint':
      bounds = updateBoundingBox2dWithMultiPoint(geometry as GeoJSON.MultiPoint, bounds)
      break
    case 'MultiLineString':
      bounds = updateBoundingBox2dWithMultiLineString(
        geometry as GeoJSON.MultiLineString,
        bounds
      )
      break
    case 'Polygon':
      bounds = updateBoundingBox2dWithPolygon(geometry as GeoJSON.Polygon, bounds)
      break
    case 'MultiPolygon':
      bounds = updateBoundingBox2dWithMultiPolygon(
        geometry as GeoJSON.MultiPolygon,
        bounds
      )
      break
    case 'GeometryCollection':
      console.error('GeometryCollection')
      break
    default:
  }
  return bounds as GeoJSON.BBox;
}

export default function geojsonBoundingBox(geojson: GeoJSON.FeatureCollection): GeoJSON.BBox | null {
  let bounds: GeoJSON.BBox | null = null;
  for (const feature of geojson.features) {
    if (feature.geometry === null) {
      continue;
    }
    bounds = updateBoundingBox2dWithGeometry(feature.geometry, bounds);
  }
  return bounds
}
