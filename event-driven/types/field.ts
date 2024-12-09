export type Field = {
  id: number;
  name: string;
  coordinates: Coordinate[];
  machines: number[]
  status: FieldStatus;
}

export type Coordinate = {
  lat: number;
  long: number;
}

export enum FieldStatus {
  PLANTING = 'PLANTING',
  HARVESTING = 'HARVESTING',
  IRRIGATING = 'IRRIGATING',
  SPRAYING = 'SPRAYING',
  IDLE = 'IDLE'
}
