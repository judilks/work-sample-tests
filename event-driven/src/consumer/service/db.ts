import {Field} from "../../../types/messages.ts";
import * as repository from "../repository/db.ts";

export function update(id: number, data: Partial<Field>) {
  const field = repository.get(id);

  if (!field) {
    console.error('Field does not exist');
    return;
  }

  repository.set(id, {
    ...field,
    ...data
  })
}

export function removeMachine(id: number, machineId: number) {
  const field = repository.get(id);

  if(!field) {
    console.error('Field does not exist');
    return;
  }

  // Not using machineId since the generator has no way of knowing what machines are in a field currently. So we are just going to remove the last one
  field.machines.pop();

  update(id, field);
}

export function getAll() {
  const keys = repository.keys();
  const fieldsById: Record<string, Field> = {}

  keys.forEach(key => {
    const field = repository.get(key);
    if(field) {
      fieldsById[key] = field
    }
  })

  return fieldsById;
}

export function get(id: number) {
  return repository.get(id);
}
