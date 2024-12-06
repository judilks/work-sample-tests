export type Message = {
  body: string;
  id: string;
  timestamp: string;
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

export type Field = {
  id: number;
  name: string;
  coordinates: Coordinate[];
  machines: number[]
  status: FieldStatus;
}

export enum MessageType {
  FIELD_STATUS = 'FIELD_STATUS',
  FIELD_COORDINATES = 'FIELD_COORDINATES',
  MACHINE_ENTERED = 'MACHINE_ENTERED',
  MACHINE_EXITED = 'MACHINE_EXITED',
}

export interface MessageBody {
  type: MessageType
  fieldId: number
}

export interface FieldStatusMessage extends MessageBody {
  status: FieldStatus
}

export interface FieldCoordinatesMessage extends MessageBody {
  coordinates: Coordinate[]
}

export interface MachineUpdateMessage extends MessageBody {
  machineId: number
}

