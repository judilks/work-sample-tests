import {Coordinate, FieldStatus} from "./field.ts";
import {PrecipitationChance, TemperatureLabel, WeatherCondition, WindDirection} from "./weather.ts";

export type Message = {
  body: string;
  id: string;
  timestamp: string;
}

export enum MessageType {
  FIELD_STATUS = 'FIELD_STATUS',
  FIELD_COORDINATES = 'FIELD_COORDINATES',
  MACHINE_ENTERED = 'MACHINE_ENTERED',
  MACHINE_EXITED = 'MACHINE_EXITED',
  WEATHER = 'WEATHER'
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

export interface WeatherMessage extends MessageBody {
  temperature: {
    value: number;
    label: TemperatureLabel;
  },
  condition: WeatherCondition
  wind: {
    value: number,
    direction: WindDirection
    label: 'MPH'
  }
  precipitationChance: PrecipitationChance
}

