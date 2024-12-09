import {FieldStatusMessage} from "../../../types/messages";
import {get, update} from "../service/field";

export function handler(message: FieldStatusMessage) {
  update(message.fieldId, {status: message.status});
  return get(message.fieldId);
}
