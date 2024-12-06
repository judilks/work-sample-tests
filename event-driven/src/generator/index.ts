import {set} from "../consumer/repository/db.ts";
import {
  Coordinate,
  FieldCoordinatesMessage,
  FieldStatus,
  FieldStatusMessage, MachineUpdateMessage, Message,
  MessageType
} from "../../types/messages.ts";
import * as uuid from "uuid";
import Chance from 'chance';

const chance = new Chance();

export function generateFields() {
  for (let i = 1; i <= 20; i++) {
    set(i, {
      id: i,
      name: chance.word(),
      coordinates: generateCoordinates(),
      status: generateFieldStatus(),
      machines: chance.n(() => chance.natural({min: 1, max: 10000}), chance.d6())
    })
  }
}

function generateFieldStatus() {
  return chance.pickone([FieldStatus.HARVESTING, FieldStatus.IDLE, FieldStatus.IRRIGATING, FieldStatus.SPRAYING, FieldStatus.PLANTING])
}

function generateFieldStatusMessage(): FieldStatusMessage {
  return {
    status: generateFieldStatus(),
    fieldId: chance.d20(),
    type: MessageType.FIELD_STATUS,
  }
}

function generateCoordinates() {
  const coordinates: Coordinate[] = []
  for (let i = 0; i < chance.d6(); i++) {
    coordinates.push({lat: chance.latitude(), long: chance.longitude()})
  }
  return coordinates;
}

function generateFieldCoordinatesMessage(): FieldCoordinatesMessage {
  return {
    type: MessageType.FIELD_COORDINATES,
    fieldId: chance.d20(),
    coordinates: generateCoordinates()
  }
}

function generateMachineUpdateMessage(type: Exclude<MessageType, FieldCoordinatesMessage | FieldStatusMessage>): MachineUpdateMessage {
  return {
    type,
    fieldId: chance.d20(),
    machineId: chance.natural({min: 1, max: 10000})
  }
}


export function generateMessages(): Message[] {
  const numberOfMessages = chance.d4();
  const messages: Message[] = [];

  for (let i = 0; i < numberOfMessages; i++) {
    const type = chance.pickone([MessageType.FIELD_STATUS, MessageType.MACHINE_EXITED, MessageType.FIELD_COORDINATES, MessageType.MACHINE_ENTERED])

    let body;

    switch (type) {
      case MessageType.FIELD_STATUS:
        body = generateFieldStatusMessage();
        break;
      case MessageType.FIELD_COORDINATES:
        body = generateFieldCoordinatesMessage();
        break;
      case MessageType.MACHINE_ENTERED:
        body = generateMachineUpdateMessage(type);
        break;
      case MessageType.MACHINE_EXITED:
        body = generateMachineUpdateMessage(type);
        break;
    }

    messages.push({id: uuid.v4(), timestamp: new Date().toISOString(), body: JSON.stringify(body)});
  }

  return messages;
}
