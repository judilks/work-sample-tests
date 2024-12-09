# Event Driven

## Current implementation

This application currently displays a table of 20 fields with columns containing data for the following. 
The UI has live update capabilities through a websocket implementation where it will update data in the table as new data comes over the wire. The table currently contains the following columns

- ID
- Name
- Status
- Machine Count

There are two main components of the application you will need to make changes to throughout this assessment, the `client` and `server`.
The `generator` and `producer` are used for creating and publishing the fake messages the application is subscribed to and should NOT be modified.

## Client
The client is a React application. On initialization, it will call `GET /fields` from the `api` to get the initial field data.
It will also create a websocket connection to the `api` at `"ws://localhost:3000"`. It will render the table and set up the websocket connection once `GET /fields` has finished. 

## API
The api serves both the `GET /fields` endpoint as well as the `"ws://localhost:3000"` websocket endpoint. 
On startup, it will generate 20 fields and write them to a cache created using [node-cache](https://www.npmjs.com/package/node-cache) (Normally this would be an actual database but for the sake of this assessment we wanted to limit the amount of dependent technologies that would be installed). 
The `api` also contains "handlers" for the various message types that it receives over the websocket connection from the `producer`.

## Message Types

There are currently 4 messages the `api` listens for from the producer

- `FIELD_STATUS`
- `FIELD_COORDINATES`
- `MACHINE_ENTERED` 
- `MACHINE_EXITED`

### FIELD_STATUS

`FIELD_STATUS` updates a field's status property with a value from the `FieldStatus` enum.

### FIELD_COORDINATES

`FIELD_COORDINATES` updates a field's `coordinates` array

### MACHINE_ENTERED

`MACHINE_ENTERED` adds the provided machine id to the field's `machines` array

### MACHINE_EXITED

`MACHINE_ENTERED` removes the provided machine id to the field's `machines` array. (Currently since there is no way for the producer to know what random machines are in a field the handler just removes one machine from the array. This is intended.)

## Types
Types for fields and messages exist in the `./types` directory.
