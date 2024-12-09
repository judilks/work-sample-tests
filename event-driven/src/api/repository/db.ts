import NodeCache from "node-cache";

const db = new NodeCache();

export function get<T>(id: number | string): T | undefined {
  return db.get<T>(id);
}

export function set<T>(id: number | string, field: T) {
  db.set<T>(id, field);
}

export function keys(): string[] {
  return db.keys();
}
