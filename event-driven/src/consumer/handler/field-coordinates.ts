import {FieldCoordinatesMessage} from "../../../types/messages.ts";
import {get, update} from "../service/db.ts";

export function handler(message: FieldCoordinatesMessage) {
  update(message.fieldId, {coordinates: message.coordinates});
  return get(message.fieldId);
}
