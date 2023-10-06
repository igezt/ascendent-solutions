# Endpoints

## Clients

- POST /api/client - Creates a new client
- DELETE /api/client/{client-id} - Deletes the client with client-id
- GET /api/client/{client-id} - Gets the information about a client with client-id
- UPDATE /api/client/{client-id} - Updates the information about a client with client-id

## Case

- POST /api/case - Creates a new case
- GET /api/case/client/{client-id} - Gets all cases raised by client of client-id
- GET /api/case/completed - Gets all completed cases
- GET /api/case/outstanding - Gets all completed cases
- GET /api/case/staff/{staff-id} - Gets all cases handled by a staff member with staff-id
- UPDATE /api/case/{case-id} - Updates the case with case-id
