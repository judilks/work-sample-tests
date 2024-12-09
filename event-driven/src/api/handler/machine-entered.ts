import {MachineUpdateMessage} from "../../../types/messages";
import {get, update} from "../service/field";

export function handler(message: MachineUpdateMessage) {
  update(message.fieldId, {machines: [message.machineId]});
  return get(message.fieldId)
}
