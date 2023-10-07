# Endpoints

## Clients

- POST /api/client - Creates a new client
- DELETE /api/client/:clientId - Deletes the client with clientId
- GET /api/client/:clientId - Gets the information about a client with clientId
- UPDATE /api/client/:clientId - Updates the information about a client with clientId
- GET /api/client - Gets all the clients.

## Case

### Overview

- GET /api/case/client/:clientId - Gets all cases raised by client of clientId
- GET /api/case/staff/:staffId - Gets all cases handled by a staff member with staffId
- GET /api/case/completed - Gets all completed cases
- GET /api/case/outstanding - Gets all completed cases
- POST /api/case - Creates a new case
- UPDATE /api/case/:caseId - Updates the case with cid equals to caseId
- DELETE /api/case/:caseId - Deletes the case with cid equals to caseId
- GET /api/case/:caseId - Gets the case with cid equals to caseId
- GET /api/case - Gets all the cases.

# Database design

Set onDelete to NoAction because losing the case can be very detrimental.
