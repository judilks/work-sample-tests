import {useReducer, useEffect, useState, Reducer, PropsWithChildren} from "react";
import {Field} from "../../types/messages.ts";
import {io} from "socket.io-client";
import {Table} from "./table/table.tsx";

enum FieldActionType {
  SET_FIELDS = "SET_FIELDS",
  UPDATE_FIELD = "UPDATE_FIELD",
}

type UpdateFieldAction = {
  type: FieldActionType.UPDATE_FIELD
  payload: Field
}

type SetFieldsAction = {
  type: FieldActionType.SET_FIELDS,
  payload: Record<string, Field>
}

type FieldState = {
  fields: Record<string, Field>,
  loading: boolean,
}

function fieldReducer(state: FieldState, action: UpdateFieldAction | SetFieldsAction) {
  switch (action.type) {
    case FieldActionType.SET_FIELDS:
      return {
        ...state,
        fields: action.payload,
        loading: false
      }
    case FieldActionType.UPDATE_FIELD:
      const field = action.payload;

      return {
        ...state,
        fields: {
          ...state.fields,
          [field.id]: field
        }
      }
  }
}

function App() {
  const [{fields, loading}, dispatch] = useReducer(fieldReducer, {fields: {}, loading: true});

  useEffect(() => {
    const getFields = () => {
      fetch("http://localhost:3000/fields")
        .then((res) => res.json())
        .then((data) => {
          dispatch({type: FieldActionType.SET_FIELDS, payload: data})
        })
        .catch((err) => console.error(err));
    }

    getFields();
  }, [])

  useEffect(() => {
    if(!loading) {
      const socket = io("ws://localhost:3000");

      socket.io.on("error", (error) => {
        console.error('Client connection error: ', error)
      })

      socket.on("field update", (field) => {
        dispatch({type: FieldActionType.UPDATE_FIELD, payload: field})
      })

      return () => {
        socket.close();
      }
    }
  }, [loading])

  return (
    <Table
      data={Object.values(fields)}
      columns={[
        {
          name: 'id',
          accessor: (data) => data.id,
          header: () => <span>{'ID'}</span>,
          cell: ({children}) => <div>{children}</div>
        },
        {
          name: 'name',
          accessor: (data) => data.name,
          header: () => <span>{'Name'}</span>,
          cell: ({children}) => <div>{children}</div>
        },
        {
          name: 'status',
          accessor: (data) => data.status,
          header: () => <span>{'Status'}</span>,
          cell: ({children}) => <div>{children}</div>
        },
        {
          name: 'machines',
          accessor: (data) => data.machines.length,
          header: () => <span>{'Machines'}</span>,
          cell: ({children}) => <div>{children}</div>
        }
      ]}
    />
  )
}

export default App
