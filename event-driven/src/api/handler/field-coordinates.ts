import {FieldCoordinatesMessage} from "../../../types/messages";
import {get, update} from "../service/field";

export function handler(message: FieldCoordinatesMessage) {
  update(message.fieldId, {coordinates: message.coordinates});
  return get(message.fieldId);
}
