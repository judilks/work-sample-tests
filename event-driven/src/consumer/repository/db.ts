import NodeCache from "node-cache";
import {Field} from "../../../types/messages.ts";

const db = new NodeCache();

export function get(id: number | string): Field | undefined {
  return db.get<Field>(id);
}

export function set(id: number, field: Field) {
  db.set(id, field);
}

export function keys(): string[] {
  return db.keys();
}
