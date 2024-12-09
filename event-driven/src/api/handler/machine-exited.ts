import {MachineUpdateMessage} from "../../../types/messages";
import {get, removeMachine} from "../service/field";

export function handler(message: MachineUpdateMessage) {
  removeMachine(message.fieldId, message.machineId);
  return get(message.fieldId);
}
