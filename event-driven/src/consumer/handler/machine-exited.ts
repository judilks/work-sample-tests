import {MachineUpdateMessage} from "../../../types/messages.ts";
import {get, removeMachine} from "../service/db.ts";

export function handler(message: MachineUpdateMessage) {
  removeMachine(message.fieldId, message.machineId);
  return get(message.fieldId);
}
