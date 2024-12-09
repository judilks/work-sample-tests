import * as repository from "../repository/db";
import {Field} from "../../../types/field";

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
  const field = repository.get<Field>(id);

  if (!field) {
    console.error('Field does not exist');
    return;
  }

  // Not using machineId since the generator has no way of knowing what machines are in a field currently. So we are just going to remove the last one.
  // This is not a bug, you can ignore this
  field.machines.pop();

  update(id, field);
}

export function getAll(): Record<string, Field> {
  const keys = repository.keys();
  const fieldsById: Record<string, Field> = {}

  keys.forEach(key => {
    const field = repository.get<Field>(key);
    if (field) {
      fieldsById[key] = field
    }
  })

  return fieldsById;
}

export function get(id: number): Field | undefined {
  return repository.get<Field>(id);
}
