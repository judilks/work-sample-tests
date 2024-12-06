import {MachineUpdateMessage} from "../../../types/messages.ts";
import {get, update} from "../service/db.ts";

export function handler(message: MachineUpdateMessage) {
  update(message.fieldId, {machines: [message.machineId]});
  return get(message.fieldId)
}
