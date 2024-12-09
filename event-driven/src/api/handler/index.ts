import {
    FieldCoordinatesMessage,
    FieldStatusMessage,
    MachineUpdateMessage,
    Message,
    MessageBody,
    MessageType
} from "../../../types/messages.ts";
import * as fieldCoordinates from './field-coordinates.ts'
import * as fieldStatus from './field-status.ts'
import * as machineEntered from './machine-entered.ts'
import * as machineExited from './machine-exited.ts'
import {Server} from "socket.io";

export default function handler(messages: Message[], io: Server) {
    console.log(`Received ${messages.length} messages`);

    messages.forEach(message => {
        const body: MessageBody = JSON.parse(message.body);
        let field;

        switch (body.type) {
            case MessageType.FIELD_COORDINATES:
                field = fieldCoordinates.handler(body as FieldCoordinatesMessage);
                break;
            case MessageType.MACHINE_ENTERED:
                field = machineEntered.handler(body as MachineUpdateMessage);
                break;
            case MessageType.MACHINE_EXITED:
                field = machineExited.handler(body as MachineUpdateMessage);
                break;
            case MessageType.FIELD_STATUS:
                field = fieldStatus.handler(body as FieldStatusMessage);
                break;
            default:
                break;
        }

        if(field) {
            io.emit("field update", field)
        }
    })
}
