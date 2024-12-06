import {FieldStatusMessage} from "../../../types/messages.ts";
import {get, update} from "../service/db.ts";

export function handler(message: FieldStatusMessage) {
  update(message.fieldId, {status: message.status});
  return get(message.fieldId);
}
