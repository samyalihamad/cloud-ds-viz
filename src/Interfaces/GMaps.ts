interface Point {
  x: number;
  y: number;
}

interface Edge {
  a: Point;
  b: Point;
}

interface gMapsResponse {
  vicinityPaths: Edge[];
  shortestPaths: Edge[];
}