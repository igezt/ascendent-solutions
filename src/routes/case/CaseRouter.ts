import Router from 'express';
export const caseRouter = Router();

// - GET /api/case/client/{client-id} - Gets all cases raised by client of client-id
caseRouter.get('/client/{client-id}');
// - GET /api/case/staff/{staff-id} - Gets all cases handled by a staff member with staff-id
caseRouter.get('/staff/{client-id}');
// - GET /api/case/completed - Gets all completed cases
caseRouter.get('/completed');
// - GET /api/case/outstanding - Gets all completed cases
caseRouter.get('/outstanding');
// - POST /api/case - Creates a new case
caseRouter.post('/');
// - UPDATE /api/case/{case-id} - Updates the case with case-id
caseRouter.put('/{case-id}');
